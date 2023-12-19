import { z as zod } from 'zod';

const categoryTypeSchema = zod.object({
  type: zod.string().min(1, 'Type is required!'),
});


export const addTypeValue = async (prevState: any, formData: FormData) => {
  const type = formData.get('type');

  const validatedFields = categoryTypeSchema.safeParse({type});

  if(!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  return type;
}