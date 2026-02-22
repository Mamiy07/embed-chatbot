"use client"
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from '../ui/dialog'
import { Field, FieldGroup } from '../ui/field'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { useMutation } from '@tanstack/react-query'
import { createBusiness } from '@/actions/business'
import { Textarea } from '../ui/textarea'
import { encrypt } from '@/lib/encryption'
import { DropdownMenuDemo } from './dropdownmenu'
import { businessSchema } from '@/lib/schema'


const EmbedButton = () => {
  const MODEL_OPTIONS: Record<string, string[]> = {
  openai: ['gpt-4', 'gpt-4o', 'gpt-3.5-turbo'],
  gemini: ['gemini-2.0-flash-lite','gemini-2.5-flash', 'gemini-1.5-pro'],
  claude: ['claude-2', 'claude-3-sonnet'],
} 
   const [open, setOpen] = useState(false)
   const [businessName, setBusinessName] = useState('')
   const [supportEmail, setSupportEmail] = useState('')
   const [description, setDescription] = useState('')
   const [aiProvider, setAiProvider] = useState('')
   const [encryptedApiKey, setApiKey] = useState('')
   const [model, setModel] = useState('')
   const [errors, setErrors] = useState<Record<string, string>>({})
 const availableModels = aiProvider ? MODEL_OPTIONS[aiProvider] || [] : []
  
useEffect(() => {
}, [aiProvider])
  

  const { mutate, isPending } = useMutation({
  mutationFn: async (data: { businessName: string; supportEmail: string; aiProvider: string; model: string; apiKey: string; description: string }) => {

    return await createBusiness({
      ...data,
      encryptedApiKey: encryptedApiKey,
    })
  },
  onSuccess: () => {
    setOpen(false)
    setBusinessName("")
    setSupportEmail("")
    setDescription("")
    setAiProvider("")
    setApiKey("")
    setModel("")
    setErrors({})
  },
})
   const handleSave = (e: React.FormEvent) => {
  e.preventDefault()
  const result = businessSchema.safeParse({
    businessName,
    supportEmail,
    aiProvider,
    model,
    apiKey: encryptedApiKey,
    description,
  })

  if (!result.success) {
    const fieldErrors: Record<string, string> = {}

    result.error.issues.forEach((err) => {
      if (err.path[0]) {
        fieldErrors[err.path[0] as string] = err.message
      }
    })

    setErrors(fieldErrors)
    return
  }

  setErrors({})
  mutate(result.data)
}
  return (
    <div>
  <Button className='bg-white text-black' variant="default" onClick={() => setOpen(true)}>Create Chatbot</Button>
    <Dialog open={open} onOpenChange={setOpen}>
    
     <DialogContent className="sm:max-w-lg w-full ">
          <DialogHeader>
            <DialogTitle>Create New Embed</DialogTitle>
            <DialogDescription>
             Enter full details of the business you want to create embed for.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup >
            <div className="grid grid-cols-2 gap-4">

            <Field>
              <Label htmlFor="name-1">Business Name</Label>
              <Input id="name-1" value={businessName} onChange={e => setBusinessName(e.target.value)} name="name" placeholder="Name of your business" />
              {errors.businessName && (
  <p className="text-red-500 text-sm">{errors.businessName}</p>
)}
            </Field>
            <Field>
              <Label htmlFor="username-1">Business Email</Label>
              <Input id="username-1" value={supportEmail} onChange={e => setSupportEmail(e.target.value)} name="username" placeholder="abc@gmail.com" />
              {errors.supportEmail && (
  <p className="text-red-500 text-sm">{errors.supportEmail}</p>
)}
            </Field>
            </div>
            <div className='grid grid-cols-2 gap-4'>

              <Field>
              <Label htmlFor="aiProvider-1">AI Provider</Label>
               <DropdownMenuDemo value={aiProvider} items={['gemini', 'openai', 'claude']} onSelect={(value) =>{ setAiProvider(value) , setModel('')}} />
                {errors.aiProvider && (
  <p className="text-red-500 text-sm">{errors.aiProvider}</p>
)}
              </Field>
                <Field>
              <Label htmlFor="model-1">Model</Label>
              <DropdownMenuDemo value={model} items={availableModels} onSelect={(value) => setModel(value)} disabled={!aiProvider} />
                {errors.model && (
  <p className="text-red-500 text-sm">{errors.model}</p>
)}
              </Field>
            </div>
               <Field>
              <Label htmlFor="apiKey-1">API Key</Label>
              <Input id="apiKey-1" value={encryptedApiKey} onChange={e => setApiKey(e.target.value)} name="apiKey" placeholder="Your API Key" />
              {errors.apiKey && (
  <p className="text-red-500 text-sm">{errors.apiKey}</p>
)}
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
   className="min-h-[160px] max-h-[160px] overflow-y-auto resize-none"

  />
  {errors.description && (
  <p className="text-red-500 text-sm">{errors.description}</p>
)}
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
           <Button onClick={handleSave} disabled={isPending}>
  {isPending ? "Creating..." : "Save changes"}
</Button>
          </DialogFooter>
        </DialogContent>
      
    </Dialog>
    </div>
  )
}

export default EmbedButton
