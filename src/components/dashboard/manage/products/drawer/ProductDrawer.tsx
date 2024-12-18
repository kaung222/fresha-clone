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
import ActionDropDown from "./component/ActionDropDown"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import PhoneProductDetail from "./phone-component/PhoneProductDetail"
import PhoneProductOverview from "./phone-component/PhoneProductOverview"
import ProductOverview from "./component/ProductOverview"
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'



export default function ProductDetailsDrawer() {
    const { getQuery, deleteQuery, setQuery } = useSetUrlParams()
    const drawer = getQuery('drawer');
    const drawerTab = getQuery('drawer-tab');
    const { data: singleProduct, isLoading } = GetSingleProduct(drawer);

    const handleClose = () => {
        deleteQuery({ key: 'drawer' });
        deleteQuery({ key: "drawer-tab" })
    }
    const drawerTabHandler = (tab: string) => {
        setQuery({ key: 'drawer-tab', value: tab })

    }


    const renderCurrentTab = (tab: string) => {
        if (singleProduct) {
            switch (tab) {
                case "details":
                    return <ProductDetails singleProduct={singleProduct} />;
                default:
                    return <ProductOverview />;

            }
        }
    }

    const phoneScreenRenderCurrentTab = (tab: string) => {
        if (singleProduct) {
            switch (tab) {
                case "details":
                    return <PhoneProductDetail singleProduct={singleProduct} />;
                case "overview":
                    return <PhoneProductOverview />;

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
                                <div className="bg-gray-100 w-[200px] h-40 mx-auto rounded-lg  mb-4 relative ">
                                    {singleProduct.images && singleProduct.images.length > 0 ? (
                                        singleProduct.images.map((image, index) => (
                                            <PhotoView key={index} src={image}>
                                                {index > 0 ? (
                                                    <div className=" hidden"></div>
                                                ) : (
                                                    <div className=" ">
                                                        <Avatar className=' w-[200px] h-40 rounded-sm '>
                                                            <AvatarImage src={image} className=' object-cover ' width={1000} height={800} />
                                                            <AvatarFallback className="rounded-sm">img</AvatarFallback>
                                                        </Avatar>
                                                        {/* <Image
                                                            src={image}
                                                            alt="img"
                                                            width={500}
                                                            height={400}
                                                            className=" w-40 h-32 mx-auto object-cover "

                                                        /> */}
                                                    </div>
                                                )}
                                            </PhotoView>
                                        ))
                                    ) : (

                                        <IconImage className="h-32 w-40 mx-auto text-gray-400" />
                                    )}
                                    <div className=" absolute top-2 right-2 flex items-center text-sm bg-white rounded-sm p-1 ">{singleProduct.images.length} <ImageIcon className=" w-4 h-4 " /> </div>
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
                                <Button onClick={() => drawerTabHandler('overview')} variant={drawerTab == 'overview' ? "brandDefault" : 'brandGhost'} className={`w-full justify-start font-medium ${drawerTab ? "  " : " sm:bg-brandColor sm:text-white sm:hover:bg-brandColor/90  "} `}>
                                    Overview
                                </Button>
                                <Button onClick={() => drawerTabHandler('details')} variant={drawerTab == 'details' ? "brandDefault" : "brandGhost"} className="w-full justify-start font-medium">
                                    Product Info
                                </Button>

                            </nav>
                        </aside>

                        <main style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }} className="flex-1 p-8 h-full hidden sm:block  overflow-auto">
                            {renderCurrentTab(drawerTab)}
                        </main>
                        <main className="block sm:hidden">
                            {phoneScreenRenderCurrentTab(drawerTab)}
                        </main>
                    </div>
                )
            )}
        </Modal>
    )
}