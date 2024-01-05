import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "@/prisma/client";

interface Body {
  name: string
  email: string
}

interface Props {
  params: { id: string };
}

export async function GET(request: NextRequest, { params: { id } }: Props) {
  // fetch data from db
  // if not fount, return 404 error
  // else return data

  const user = await prisma.user.findUnique({
    where: {id: parseInt(id)}
  })

  if (!user) {
    return NextResponse.json({error: "User not fount"}, {status: 404});
  }

  return NextResponse.json(user)
}

export async function PUT(request: NextRequest, {params: {id}}: Props) {
    // validate request body
    // if invalid, return 400 error
    // else, fetch user with given id
    // if doesn't exist, return 404 error
    // else update the user and return updated user

    const body: Body = await request.json();
    const validation = schema.safeParse(body)
    if (!validation.success) {
        return NextResponse.json(validation.error.errors, {status: 400})
    }

    const user = await prisma.user.findUnique({
      where: {id: parseInt(id)}
    })

    if (!user) {
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    const updatedUser = await prisma.user.update({
      where: {id: user.id},
      data: {
        name: body.name,
        email: body.email
      }
    })

    return NextResponse.json(updatedUser)
}

export async function DELETE(request: NextRequest, {params: {id}}: Props) {
  // fetch user from db
  // if not found, return 404 error
  // else, delete user and return 200 response

  const user = await prisma.user.findUnique({
    where : {id: parseInt(id)}
  })

  if (!user) {
    return NextResponse.json({error: "User not found"}, {status: 404})
  }

  await prisma.user.delete({
    where: {id: user.id}
  })

  return NextResponse.json({})
}
