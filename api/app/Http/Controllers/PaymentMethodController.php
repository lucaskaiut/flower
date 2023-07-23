<?php

namespace App\Http\Controllers;

use App\Http\Requests\PaymentMethodStoreRequest;
use App\Http\Requests\PaymentMethodUpdateRequest;
use App\Http\Resources\PaymentMethodResource;
use App\Models\PaymentMethod;
use App\Services\PaymentMethodService;
use Illuminate\Http\Request;

class PaymentMethodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(PaymentMethodService $paymentMethodService)
    {
        return PaymentMethodResource::collection($paymentMethodService->paginate());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PaymentMethodStoreRequest $request, PaymentMethodService $paymentMethodService)
    {
        return new PaymentMethodResource($paymentMethodService->store($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show(PaymentMethod $paymentMethod, PaymentMethodService $paymentMethodService)
    {
        return new PaymentMethodResource($paymentMethod);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PaymentMethodUpdateRequest $request, PaymentMethod $paymentMethod, PaymentMethodService $paymentMethodService)
    {
        return new PaymentMethodResource($paymentMethodService->update($paymentMethod, $request->all()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PaymentMethod $paymentMethod, PaymentMethodService $paymentMethodService)
    {
        $paymentMethodService->delete($paymentMethod);
    }
}
