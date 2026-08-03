export type PublicUser = {
  id: string;
  email: string;
  name: string;
  role: "member" | "admin";
  communityIds: string[];
  freeReads: number;
  createdAt: string;
};
