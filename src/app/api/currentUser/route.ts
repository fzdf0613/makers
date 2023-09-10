import { NextResponse } from "next/server";
import { getUserById } from "@/service/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { User } from "@/customType/user";

export async function GET() {
  const session = await getServerSession(authOptions);
  const user = session.user;

  if (!user) {
    return NextResponse.error();
  }

  try {
    const userData = await getUserById(user.id);
    if (!userData) {
      throw new Error("유저 정보가 존재하지 않습니다.");
    }
    const filtered = {
      isAdmin: (userData as User).isAdmin,
      like: (userData as User).like,
      ordered: (userData as User).ordered,
      profileImageUrl: (userData as User).profileImageUrl,
      inquiry: (userData as User).inquiry,
      review: (userData as User).review,
      search: (userData as User).search,
      seen: (userData as User).seen,
      username: (userData as User).username,
      userid: (userData as User).userid,
    };
    return NextResponse.json(filtered);
  } catch (error) {
    console.log("getUserById Error : ", error);
    return NextResponse.error();
  }
}
