'use client'
import { GetSingleProduct } from "@/api/product/get-single-product"
import Loading from "@/components/common/loading"
import Modal from "@/components/modal/Modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { ChevronDown, Image as IconImage } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import ProductDetails from "./component/product-detail"
import Sale from "./component/sale"
import Order from "./component/order"
import History from "./component/history"
import ActionDropDown from "./component/ActionDropDown"

interface ProductDetail {
    label: string
    value: string | number
}

const basicInfo: ProductDetail[] = [
    { label: "Product barcode", value: "12gsg381" },
    { label: "Brand", value: "-" },
    { label: "Product Category", value: "-" },
    { label: "Amount", value: "-" },
    { label: "Short description", value: "-" },
    { label: "Product description", value: "-" },
]

const stockInfo: ProductDetail[] = [
    { label: "Primary SKU", value: "-" },
    { label: "Instock", value: "12" },
    { label: "Supply price", value: "MMK 50" },
    { label: "Retails price", value: "MMK 100" },
    { label: "Total stock cost", value: "-" },
    { label: "Average stock cost", value: "-" },
]

export default function ProductDetailsDrawer() {
    const { getQuery, deleteQuery, setQuery } = useSetUrlParams()
    const drawer = getQuery('drawer');
    const drawerTab = getQuery('drawer-tab');
    const { data: singleProduct, isLoading } = GetSingleProduct(drawer);

    const handleClose = () => {
        deleteQuery({ key: 'drawer' });
    }
    const drawerTabHandler = (tab: string) => {
        setQuery({ key: 'drawer-tab', value: tab })

    }
    return (
        <Modal onClose={handleClose}>
            {isLoading ? (
                <Loading />
            ) : (
                singleProduct && (
                    <div className=" flex w-full h-full  bg-gray-100 lg:w-[800px] overflow-hidden">
                        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-64 border-r flex-shrink-0 bg-white p-6 overflow-auto">
                            <div className="mb-4">
                                <div className="bg-gray-100 rounded-lg p-4 mb-4">
                                    {singleProduct.images ? (

                                        <Image
                                            src={singleProduct.images[0]}
                                            alt="img"
                                            width={500}
                                            height={400}
                                            className=" w-32 h-32 mx-auto object-cover "

                                        />
                                    ) : (

                                        <IconImage className="h-32 w-32 mx-auto text-gray-400" />
                                    )}
                                </div>
                                <h1 className="text-xl font-bold mb-1">{singleProduct.name}</h1>
                                <p className="text-sm text-blue-600 mb-4">12 instock</p>
                                <ActionDropDown />
                            </div>

                            <nav className="space-y-1">
                                <Button onClick={() => drawerTabHandler('details')} variant="ghost" className="w-full justify-start font-medium">
                                    Product details
                                </Button>
                                <Button onClick={() => drawerTabHandler('order')} variant="ghost" className="w-full justify-start text-gray-600">
                                    Stock orders
                                </Button>
                                <Button onClick={() => drawerTabHandler('sale')} variant="ghost" className="w-full justify-start text-gray-600">
                                    Sales
                                </Button>
                                <Button onClick={() => drawerTabHandler('history')} variant="ghost" className="w-full justify-start text-gray-600">
                                    Stock history
                                </Button>
                            </nav>
                        </div>

                        <div style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className=" flex-grow p-6 w-full hidden md:block overflow-y-auto">
                            {drawerTab == 'history' ? (
                                <History />
                            ) : drawerTab == 'sale' ? (
                                <Sale />
                            ) : drawerTab == 'order' ? (
                                <Order />
                            ) : (
                                <ProductDetails singleProduct={singleProduct} />
                            )}
                        </div>
                        <div className=" block md:hidden ">

                        </div>
                    </div>
                )
            )}
        </Modal>
    )
}