import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Barcode, Printer, Plus, Trash2, PackageOpen } from 'lucide-react'
import Modal from '@/components/modal/Modal'
import { ScrollArea } from '@/components/ui/scroll-area'
import SelectProductDrawer from './select-product'
import { Product } from '@/types/product'
import { toast } from '@/components/ui/use-toast'
import { ProductQuickSale } from '@/api/sales/product-quick-sale'
import useSetUrlParams from '@/lib/hooks/urlSearchParam'
import { Client } from '@/types/client'
import SelectClientDrawer from '@/components/dashboard/calendar/drawers/create/select-client'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { shortName } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

export type ExtendProduct = Product & {
  quantity: number;
}


export default function QuicksSale() {
  const [showProductSelect, setShowProductSelect] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<ExtendProduct[]>([]);
  const [showClientSelect, setShowClientSelect] = useState<boolean>(false);
  const [client, setClient] = useState<Client | null>(null);
  const [notes, setNotes] = useState('');
  const { getQuery, deleteQuery } = useSetUrlParams()
  const { mutate } = ProductQuickSale();



  const handleClose = () => {
    deleteQuery({ key: 'drawer' })
  }
  const removeProduct = (id: number) => {
    setSelectedProducts((pre) => pre.filter((pro) => pro.id != id))
  }

  const updateQuantity = (id: number, quantity: number) => {
    setSelectedProducts(pre => pre.map(product => product.id == id ? { ...product, quantity: Math.max(1, quantity) } : product))

  }

  const total = selectedProducts.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSave = () => {
    if (selectedProducts) {
      const payload = {
        username: client ? `${client?.firstName} ${client?.lastName}` : 'unknown',
        notes: notes,
        saleItems: selectedProducts.map((product) => ({ productId: product.id, quantity: product.quantity }))
      }
      mutate(payload, {
        onSuccess() {
          setSelectedProducts([])
        }
      })
    } else {
      toast({ title: 'no item to sale' })
    }
  }

  return (
    <Modal onClose={handleClose}>
      <Card className="w-full h-full flex flex-col ">
        <CardHeader className="border-b">
          <div className="flex justify-between items-center">
            <div>
              {
                client ? (
                  <Button onClick={() => setShowClientSelect(true)} variant="ghost" className="w-[250px] relative group flex items-center gap-4 justify-start h-16 px-8 py-4">
                    <Avatar className="h-10 w-10 ">
                      <AvatarImage src={client.profilePicture} alt={shortName(client.firstName)} className=' object-cover ' />
                      <AvatarFallback>{shortName(client.firstName)}</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className=' font-semibold
                                         '>{client.firstName} {client.lastName}</div>
                      <div className=" font-text text-gray-500">{client.email}</div>
                    </div>
                    <div className=' absolute w-full h-full top-0 left-0 rounded-lg bg-[#ffffffa5] flex justify-center items-center opacity-0 duration-300 group-hover:opacity-100 '>
                      <h2 className=' font-semibold '>Change Client</h2>
                    </div>
                  </Button>
                ) : (
                  <Button onClick={() => setShowClientSelect(true)} variant={'outline'} className=" hover:bg-gray-100 flex items-center w-[250px] justify-start text-purple-600 h-16 gap-2 ">
                    <span className="bg-purple-100 p-2 rounded-full mr-4 flex-shrink-0 size-10 flex justify-center items-center ">
                      <Plus className="h-5 w-5 inline-block " />
                    </span>
                    <span>add client</span>
                  </Button>
                )
              }
            </div>
            <div className="text-right">
              <p className="font-semibold">Product sale</p>
              <p className="text-sm text-muted-foreground">Date: {new Date().toLocaleDateString()}</p>
            </div>
          </div>
        </CardHeader>
        <ScrollArea className="p-6 flex-grow">
          <Table className=' border '>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[25%]">Product</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Subtotal</TableHead>
                <TableHead className="w-[100px]">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {selectedProducts.length > 0 ? (
                selectedProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">{product.price}</TableCell>
                    <TableCell className="text-center flex justify-center ">
                      <Input
                        type="number"
                        value={product.quantity}
                        onChange={(e) => updateQuantity(product.id, parseInt(e.target.value))}
                        className="w-16 text-center"
                        min="1"
                      />
                    </TableCell>
                    <TableCell className="text-right">{(product.price * product.quantity).toFixed(0)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeProduct(product.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 ">
                    <div className=' w-full '>
                      <PackageOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                      <h3 className="mt-2 text-sm font-semibold text-muted-foreground">No products</h3>
                      <p className="mt-1 text-sm text-muted-foreground">Get started by adding a new product.</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}

            </TableBody>
          </Table>
          <div>
            <Label>Notes</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder='Set notes..' className="focus-visible:ring-offset-0 focus:border-button focus-visible:ring-0" />
          </div>
        </ScrollArea>
        <CardFooter className="flex mt-auto justify-between items-center border-t py-2">
          <div className="text-xl font-semibold">Total: {total.toFixed(2)} MMK</div>
          <div className=' flex items-center gap-2 '>
            <Button variant={'outline'} onClick={() => setShowProductSelect(true)} className="">
              <Plus className="mr-2 h-4 w-4" /> Add Product
            </Button>
            <Button disabled={!selectedProducts} onClick={() => handleSave()} className="bg-zinc-900 text-white hover:bg-zinc-800">
              Save
            </Button>
          </div>
        </CardFooter>
      </Card>
      {
        showProductSelect && (
          <SelectProductDrawer selectedProducts={selectedProducts} setShowProductSelect={setShowProductSelect} setSelectedProducts={setSelectedProducts} />
        )
      }
      {
        showClientSelect && (
          <SelectClientDrawer setShowClientSelect={setShowClientSelect} setChooseClient={setClient} />
        )
      }
    </Modal>
  )
}