import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: { id: number };
}

export function GET(request: NextRequest, { params: { id } }: Props) {
  // fetch data from db
  // if not fount, return 404 error
  // else return data

  if (id > 10) {
    return NextResponse.json({error: "User not fount"}, {status: 404});
  }

  return NextResponse.json({id: 1, name: "Mosh"})
}

export async function PUT(request: NextRequest, {params: {id}}: Props) {
    // validate request body
    // if invalid, return 400 error
    // else, fetch user with given id
    // if doesn't exist, return 404 error
    // else update the user and return updated user

    const body = await request.json();
    if (!body.name) {
        return NextResponse.json({error: "Name is required"}, {status: 400})
    }

    if (id > 10) {
        return NextResponse.json({error: "User not found"}, {status: 404})
    }

    return NextResponse.json({id: 1, name: body.name})
}

export function DELETE(request: NextRequest, {params: {id}}: Props) {
  // fetch user from db
  // if not found, return 404 error
  // else, delete user and return 200 response

  if (id > 10) {
    return NextResponse.json({error: "User not found"}, {status: 404})
  }

  return NextResponse.json({})
}
