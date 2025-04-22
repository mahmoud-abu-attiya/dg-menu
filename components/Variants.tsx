"use client"
import { useState } from 'react'
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Plus, Trash2 } from 'lucide-react';

interface Variant {
   name: string;
   price: number;
}

type VariantsProps = {
   setVariants: (variants: Variant[]) => void;
};

const Variants = ({ setVariants }: VariantsProps) => {
   const [variants, setVariantsState] = useState<Variant[]>([{ name: '', price: 0 }]);
   const [max, setMax] = useState(false);

   const addVariant = () => {
      if (variants.length < 5) {
         setVariantsState([...variants, { name: '', price: 0 }]);
      } else {
         setMax(true);
      }
   };

   const removeVariant = (index: number) => {
      setMax(false);
      if (variants.length > 1) {
         const updatedVariants = variants.filter((_, i) => i !== index);
         setVariantsState(updatedVariants);
      }
   };

   const updateVariant = (index: number, field: keyof Variant, value: string) => {
      const updatedVariants = variants.map((variant, i) =>
         i === index ? { ...variant, [field]: value } : variant
      );
      setVariantsState(updatedVariants);
      setVariants(updatedVariants);
   };

   return (
      <section>
         <h3 className='text-xl font-bold'>Options</h3>
         <p className='text-sm text-muted-foreground mb-4'>Options are different versions of the same product. For example, a Pizza can have different sizes.</p>
         {variants.map((variant, index) => (
            <div key={index} className="mb-4">
               <h4>Option {index + 1}</h4>
               <div className="flex items-center gap-4">
                  <div className="flex-1 grid grid-cols-2 gap-4">
                     <div>
                        <Label htmlFor={`variant-name-${index}`}>Option Name</Label>
                        <Input
                           type="text"
                           id={`variant-name-${index}`}
                           placeholder='Large'
                           className="border p-2 w-full"
                           value={variant.name}
                           onChange={(e) => updateVariant(index, 'name', e.target.value)}
                        />
                     </div>
                     <div>
                        <Label htmlFor={`variant-price-${index}`}>Option Price</Label>
                        <Input
                           type="number"
                           id={`variant-price-${index}`}
                           placeholder='9.99 $'
                           className="border p-2 w-full"
                           value={variant.price}
                           onChange={(e) => updateVariant(index, 'price', e.target.value)}
                        />
                     </div>
                  </div>
                  {index !== 0 && (
                     <Button
                        onClick={() => removeVariant(index)}
                        className="mt-auto rounded-lg bg-muted-foreground hover:opacity-80 hover:bg-muted-foreground"
                     >
                        <Trash2 />
                     </Button>
                  )}
               </div>
            </div>
         ))}
         {max && <p className='text-sm text-red-500 text-center mb-4'>You can only add up to 5 options.</p>}
         <Button onClick={addVariant} className='w-full rounded-lg'>
            Add Variant <Plus />
         </Button>
      </section>
   )
}

export default Variants