export async function checkDuplicateBeforeCreate(
  apiInstance: any,
  token: string,
  payload: { [key: string]: any },
  nameField: string  
) {
  const allRes = await apiInstance.getAll(token);
  const allBody = await allRes.json();

  const duplicate = allBody.result?.find(
    (item: any) => item[nameField] === payload[nameField]
  );

  if (duplicate) {
    throw new Error(
      `'${payload[nameField]}' already exists (ID: ${duplicate.id ?? JSON.stringify(duplicate)}). Please delete it before running.`
    );
  }
}