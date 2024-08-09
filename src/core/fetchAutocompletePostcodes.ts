import { AutoCompleteRes } from "@/types/AutoCompleteRes";

export default async function fetchAutocompletePostcodes(
  currentPostcode: string,
  previousPostcode: string
): Promise<string[]> {
  if (!currentPostcode) return [];
  if (previousPostcode === currentPostcode) return [];

  const test = await fetch(
    `https://api.postcodes.io/postcodes/${currentPostcode}/autocomplete`
  );
  const res: AutoCompleteRes = await test.json();

  return res.result ?? [];
}
