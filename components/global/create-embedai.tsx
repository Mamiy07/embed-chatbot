"use client"
import { useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '../ui/dialog'
import { Field, FieldGroup } from '../ui/field'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useMutation } from '@tanstack/react-query'
import { createBusiness } from '@/actions/business'
import { Textarea } from '../ui/textarea'
    
const EmbedButton = () => {
   const [open, setOpen] = useState(false)
   const [businessName, setBusinessName] = useState('')
   const [supportEmail, setSupportEmail] = useState('')
   const [description, setDescription] = useState('')
   const {mutate:createBusinessMutation} = useMutation({
        mutationFn: async () => {
            await createBusiness({businessName, supportEmail, description})
        },
        mutationKey: ['create-business'],
        onSuccess: () => {      
          setOpen(false),
            setBusinessName(''),
            setSupportEmail(''),
            setDescription('')
        }

   })
  return (
    <div>
  <Button className='bg-white text-black' variant="default" onClick={() => setOpen(true)}>Create Embed</Button>
    <Dialog open={open} onOpenChange={setOpen}>
    
        <DialogContent className="sm:max-w-sm  ">
          <DialogHeader>
            <DialogTitle>Create New Embed</DialogTitle>
            <DialogDescription>
             Enter full details of the business you want to create embed for.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup >
            <Field>
              <Label htmlFor="name-1">Business Name</Label>
              <Input id="name-1" value={businessName} onChange={e => setBusinessName(e.target.value)} name="name" placeholder="Name of your business" />
            </Field>
            <Field>
              <Label htmlFor="username-1">Business Email</Label>
              <Input id="username-1" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} name="username" placeholder="abc@gmail.com" />
            </Field>
         <Field>
              <Label htmlFor="description-1">Description</Label>
  <Textarea
    
    id="description-1"
    value={description}
    onChange={e => setDescription(e.target.value)}
    name="description"
    placeholder={`A brief description about your business. This will help us to create a better embed for you.
       
    -  Refund Policy : 7 day refund policy.
    -  delivery time : 3-5 business days.
    -  support hours : 9am to 5pm (GMT+1) on weekdays.
    -  support email : yourcompany@gmail.com
      `}
    className="min-h-[200px] min-w-[300px] max-h-[200px] overflow-y-auto resize-none"
  />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={() => createBusinessMutation()}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
    </div>
  )
}

export default EmbedButton