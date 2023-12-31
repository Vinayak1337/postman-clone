import { RequestSchema } from './RequestSchema';

export const RequestState = {
  hasURL: false,
  response: null as null | Response,
};

export const requestReducer = async (
  _: typeof RequestState,
  formData: FormData,
) => {
  try {
    return { hasURL: false, response: null };

    const validatedFields = RequestSchema.safeParse(formData);
    const parsedFields = await RequestSchema.parseAsync(formData);
    console.log(parsedFields, validatedFields, 'parsedFields');

    if (!validatedFields.success) return { hasURL: false, response: null };

    console.log(parsedFields, 'parsedFields');

    let body = null;

    if (parsedFields.body.type === 'raw') {
      body = parsedFields.body.raw;
    } else if (parsedFields.body.type === 'form-data') {
      const form = new FormData();

      parsedFields.body.params?.forEach(({ key, value }) => {
        form.append(key, value);
      });

      body = form;
    }

    const response = await fetch(parsedFields.url, {
      method: parsedFields.method,
      headers: Object.fromEntries(
        parsedFields.headers.map(({ key, value }) => [key, value]),
      ),
      body: typeof body === 'string' ? body : JSON.stringify(body),
    });

    return { hasURL: true, response };
  } catch (error) {
    console.log(error);
    return { hasURL: false, response: null };
  }
};
