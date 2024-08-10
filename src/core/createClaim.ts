import { Claim } from "@/types";
import { getUserDataById } from "./getUserDataById";

export async function createClaim(
  userId: string,
  creationIpAddress: string,
  claimData: Claim["data"]
): Promise<{ claim: Claim | null; error: Error | null }> {
  const { user, error } = await getUserDataById(userId);
  if (error || !user) {
    return { claim: null, error };
  }
  const newClaim: Claim = {
    id: new Date().getTime().toString(),
    userId: user.id,
    status: "active",
    createdDate: new Date().toISOString(),
    updatedDate: new Date().toISOString(),
    data: claimData,
    userData: user,
    creationIpAddress,
  };
  return { claim: newClaim, error: null };
}
