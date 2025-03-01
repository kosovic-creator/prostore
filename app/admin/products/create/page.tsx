import { Metadata } from 'next';
import ProductForm from '@/components/admin/product-form';
import { requireAdmin } from '@/lib/auth-guard';
export const metadata: Metadata = {
  title: 'Dodaj Artikal',
};

const CreateProductPage = async () => {
  await requireAdmin();
  return (
    <>
      <h2 className='h2-bold'>Dodaj Artikal</h2>
      <div className='my-8'>
        <ProductForm type='Create' />
      </div>
    </>
  );
};

export default CreateProductPage;
