import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Button, Input, Label, Textarea } from '@/ui'
import { PublicPageShell } from './PublicPageShell'

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.email('Enter a valid email'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type ContactFormData = z.infer<typeof contactSchema>

const CONTACT_INFO = [
  { icon: Mail, label: 'Email', value: 'contact@hris-enterprise.com' },
  { icon: Phone, label: 'Phone', value: '+1 (800) 555-0199' },
  { icon: MapPin, label: 'Office', value: '100 Enterprise Blvd, Suite 500' },
] as const

export function ContactPage(): React.JSX.Element {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '' },
  })

  const onSubmit = (): void => {
    toast.success('Message sent! Our team will get back to you shortly.')
    reset()
  }

  return (
    <PublicPageShell
      title="Contact Us"
      description="Our team is ready to help you transform your HR operations."
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="space-y-3">
          {CONTACT_INFO.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-3"
            >
              <item.icon className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-medium text-muted-foreground">{item.label}</p>
                <p className="text-sm">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <form
          className="rounded-lg border border-border bg-card p-4"
          onSubmit={(e) => {
            void handleSubmit(onSubmit)(e)
          }}
        >
          <div className="space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="contact-name">Name</Label>
              <Input id="contact-name" placeholder="Your name" {...register('name')} />
              {errors.name ? (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                type="email"
                placeholder="you@company.com"
                {...register('email')}
              />
              {errors.email ? (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              ) : null}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="contact-message">Message</Label>
              <Textarea
                id="contact-message"
                rows={3}
                placeholder="How can we help?"
                {...register('message')}
              />
              {errors.message ? (
                <p className="text-sm text-destructive">{errors.message.message}</p>
              ) : null}
            </div>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </PublicPageShell>
  )
}
