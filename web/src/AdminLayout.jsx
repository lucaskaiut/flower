import { Header } from "./Components/Header"
import { Sidebar } from "./Components/Sidebar"

export const AdminLayout = ({children}) => {
    return (
        <div className="flex flex-col">
            <Header />
            <div className="flex">
                <Sidebar />
                {children}
            </div>
        </div>
    )
}