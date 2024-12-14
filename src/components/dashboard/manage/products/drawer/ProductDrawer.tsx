'use client'
import { GetSingleProduct } from "@/api/product/get-single-product"
import Loading from "@/components/common/loading"
import Modal from "@/components/modal/Modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import useSetUrlParams from "@/lib/hooks/urlSearchParam"
import { ArrowLeft, ChevronDown, Image as IconImage, ImageIcon, X } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import ProductDetails from "./component/product-detail"
import Sale from "./component/sale"
import Order from "./component/order"
import History from "./component/history"
import ActionDropDown from "./component/ActionDropDown"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import PhoneProductDetail from "./phone-component/PhoneProductDetail"
import PhoneProductSale from "./phone-component/PhoneSale"

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


    const renderCurrentTab = (tab: string) => {
        if (singleProduct) {
            switch (tab) {
                case "sale":
                    return <Sale />;
                default:
                    return <ProductDetails singleProduct={singleProduct} />;
            }
        }
    }

    const phoneScreenRenderCurrentTab = (tab: string) => {
        if (singleProduct) {
            switch (tab) {
                case "details":
                    return <PhoneProductDetail singleProduct={singleProduct} />;
                case "sales":
                    return <PhoneProductSale />;

                default:
                    return null;
            }
        }
    }
    return (
        <Modal onClose={handleClose}>
            {isLoading ? (
                <Loading />
            ) : (
                singleProduct && (

                    <div className="block sm:flex h-screen w-full bg-white relative">
                        <Button variant={'outline'} onClick={handleClose} className=" px-2 absolute block lg:hidden size-8 z-10 rounded-full bg-white hover:bg-gray-100 top-1 right-1 ">
                            <X className=" w-4 h-4 " />
                        </Button>
                        <aside style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="w-full sm:w-[250px] bg-white p-5 border-r h-full overflow-auto space-y-4 ">
                            <div className="mb-4">
                                <div className="bg-gray-100 rounded-lg p-4 mb-4 relative ">
                                    {singleProduct.images && singleProduct.images.length > 0 ? (
                                        singleProduct.images.map((image, index) => (
                                            <PhotoView key={index} src={image}>
                                                {index > 0 ? (
                                                    <div className=" hidden"></div>
                                                ) : (
                                                    <div className=" ">
                                                        <Image
                                                            src={image}
                                                            alt="img"
                                                            width={500}
                                                            height={400}
                                                            className=" w-32 h-32 mx-auto object-cover "

                                                        />
                                                    </div>
                                                )}
                                            </PhotoView>
                                        ))
                                    ) : (

                                        <IconImage className="h-32 w-32 mx-auto text-gray-400" />
                                    )}
                                    <div className=" absolute top-2 right-2 flex items-center text-sm ">{singleProduct.images.length} <ImageIcon className=" w-4 h-4 " /> </div>
                                </div>
                                <div className=" flex justify-between items-center ">
                                    <div>
                                        <h1 className="text-xl font-bold mb-1">{singleProduct.name}</h1>
                                        <p className="text-sm text-blue-600 mb-4">{singleProduct.stock} in stock</p>
                                    </div>
                                    <ActionDropDown productId={singleProduct.id} />
                                </div>
                            </div>

                            <nav className="space-y-1">
                                <Button onClick={() => drawerTabHandler('details')} variant="ghost" className="w-full justify-start font-medium">
                                    Product details
                                </Button>
                                {/* <Button onClick={() => drawerTabHandler('order')} variant="ghost" className="w-full justify-start text-gray-600">
                                    Stock orders
                                </Button> */}
                                <Button onClick={() => drawerTabHandler('sale')} variant="ghost" className="w-full justify-start text-gray-600">
                                    Sales
                                </Button>
                                {/* <Button onClick={() => drawerTabHandler('history')} variant="ghost" className="w-full justify-start text-gray-600">
                                    Stock history
                                </Button> */}
                            </nav>
                        </aside>

                        <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-1 p-8 h-full hidden sm:block  overflow-auto">
                            {renderCurrentTab(drawerTab)}
                        </main>
                        <main className="block sm:hidden">
                            {phoneScreenRenderCurrentTab(drawerTab)}
                        </main>
                        {/* <ScrollArea className=" flex-grow p-3 md:p-6 hidden sm:block ">
                            {drawerTab == 'history' ? (
                                <History />
                            ) : drawerTab == 'sale' ? (
                                <Sale />
                            ) : drawerTab == 'order' ? (
                                <Order />
                            ) : (
                                <ProductDetails singleProduct={singleProduct} />
                            )}
                        </ScrollArea> */}
                    </div>




                    // <div className=" flex w-full h-full  bg-gray-100 overflow-hidden">
                    //     <ScrollArea className="w-64 md:w-full border-r flex-shrink-0 bg-white p-6 ">
                    //         <div className="mb-4">
                    //             <div className="bg-gray-100 rounded-lg p-4 mb-4 relative ">
                    //                 {singleProduct.images && singleProduct.images.length > 0 ? (
                    //                     singleProduct.images.map((image, index) => (
                    //                         <PhotoView key={index} src={image}>
                    //                             {index > 0 ? (
                    //                                 <div className=" hidden"></div>
                    //                             ) : (
                    //                                 <div className=" ">
                    //                                     <Image
                    //                                         src={image}
                    //                                         alt="img"
                    //                                         width={500}
                    //                                         height={400}
                    //                                         className=" w-32 h-32 mx-auto object-cover "

                    //                                     />
                    //                                 </div>
                    //                             )}
                    //                         </PhotoView>
                    //                     ))
                    //                 ) : (

                    //                     <IconImage className="h-32 w-32 mx-auto text-gray-400" />
                    //                 )}
                    //                 <div className=" absolute top-0 right-0 flex items-center text-sm ">{singleProduct.images.length} <ImageIcon className=" w-4 h-4 " /> </div>
                    //             </div>
                    //             <h1 className="text-xl font-bold mb-1">{singleProduct.name}</h1>
                    //             <p className="text-sm text-blue-600 mb-4">{singleProduct.stock} in stock</p>
                    //             <ActionDropDown productId={singleProduct.id} />
                    //         </div>

                    //         <nav className="space-y-1">
                    //             <Button onClick={() => drawerTabHandler('details')} variant="ghost" className="w-full justify-start font-medium">
                    //                 Product details
                    //             </Button>
                    //             {/* <Button onClick={() => drawerTabHandler('order')} variant="ghost" className="w-full justify-start text-gray-600">
                    //                 Stock orders
                    //             </Button> */}
                    //             <Button onClick={() => drawerTabHandler('sale')} variant="ghost" className="w-full justify-start text-gray-600">
                    //                 Sales
                    //             </Button>
                    //             {/* <Button onClick={() => drawerTabHandler('history')} variant="ghost" className="w-full justify-start text-gray-600">
                    //                 Stock history
                    //             </Button> */}
                    //         </nav>
                    //     </ScrollArea>

                    //     <ScrollArea className=" flex-grow p-6 w-full hidden md:block ">
                    //         {drawerTab == 'history' ? (
                    //             <History />
                    //         ) : drawerTab == 'sale' ? (
                    //             <Sale />
                    //         ) : drawerTab == 'order' ? (
                    //             <Order />
                    //         ) : (
                    //             <ProductDetails singleProduct={singleProduct} />
                    //         )}
                    //     </ScrollArea>
                    //     <div className=" block md:hidden ">

                    //     </div>
                    // </div>




                )
            )}
        </Modal>
    )
}