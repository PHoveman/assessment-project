import { User } from "@/types";
import userData from "./userData.json";

export async function getUserDataById(
  id: string
): Promise<{ user: User | null; error: Error | null }> {
  const user = userData.find((user) => user.id === id);

  if (!user) {
    return { user: null, error: new Error(`User with id ${id} not found`) };
  }

  return { user, error: null };
}
