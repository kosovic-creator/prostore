import { Button } from '@/components/ui/button'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Unauthorized Access',
}

export default function UnauthorizedPage() {
  return (
    <div className='container mx-auto flex h-[calc(100vh-200px)] flex-col items-center justify-center space-y-4'>
      <h1 className='h1-bold text-4xl'>Nedozvoljeni zahtjev</h1>
      <p className='text-muted-foreground'>
        Nemate dozvoli za pristup.
      </p>
      <Button asChild>
        <Link href='/'>Vratite se nazad</Link>
      </Button>
    </div>
  )
}
