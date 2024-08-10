import { AutoCompleteRes } from "@/types/AutoCompleteRes";

export default async function fetchAutocompletePostcodes(
  currentPostcode: string,
  previousPostcode: string
): Promise<string[]> {
  if (!currentPostcode) return [];
  if (previousPostcode === currentPostcode) return [];

  const res = await fetch(
    `https://api.postcodes.io/postcodes/${currentPostcode}/autocomplete`
  );
  const body: AutoCompleteRes = await res.json();

  return body.result ?? [];
}
