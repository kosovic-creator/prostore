import { DollarSign, Headset, ShoppingBag, WalletCards } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const IconBoxes = () => {
  return (
    <div>
      <Card>
        <CardContent className='grid md:grid-cols-4 gap-4 p-4'>
          <div className='space-y-2'>
            <ShoppingBag />
            <div className='text-sm font-bold'>Besplatna dostava</div>
            <div className='text-sm text-muted-foreground'>
              Besplatna dostava do €100
            </div>
          </div>
          <div className='space-y-2'>
            <DollarSign />
            <div className='text-sm font-bold'>Garantovan povrat novca</div>
            <div className='text-sm text-muted-foreground'>
              Do 30 dana od dobijanja artikla.
            </div>
          </div>
          <div className='space-y-2'>
            <WalletCards />
            <div className='text-sm font-bold'>Fleksibilno Plaćanje</div>
            <div className='text-sm text-muted-foreground'>
              Plati sa credit card, PayPal ili COD
            </div>
          </div>
          <div className='space-y-2'>
            <Headset />
            <div className='text-sm font-bold'>24/7 Podrška</div>
            <div className='text-sm text-muted-foreground'>
              Stalna Podrška
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconBoxes;
