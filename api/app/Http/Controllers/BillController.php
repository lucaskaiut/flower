<?php

namespace App\Http\Controllers;

use App\Http\Requests\BillStoreRequest;
use App\Http\Requests\BillUpdateRequest;
use App\Http\Resources\BillCollection;
use App\Http\Resources\BillResource;
use App\Models\Bill;
use App\Services\BillService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(BillService $billService)
    {
        $additional = ['totals' => ['in' => 100, 'out' => 200, 'status' => -100]];
        return (new BillCollection($billService->paginate()))->additional(['additional' => $additional]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BillStoreRequest $request, BillService $billService)
    {
        return DB::transaction(fn () => new BillResource($billService->store($request->all())));
    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill, BillService $billService)
    {
        return new BillResource($bill);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BillUpdateRequest $request, Bill $bill, BillService $billService)
    {
        return DB::transaction(fn () => new BillResource($billService->update($bill, $request->all())));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill, BillService $billService)
    {
        $billService->delete($bill);
    }
}
