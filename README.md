<!-- Please update value in the {}  -->

# Coding Sharing | devChallenges

   Solution for a challenge [Coding Sharing](https://devchallenges.io/challenge/unsplash-collection) from [devChallenges.io](http://devchallenges.io).

  **[Demo](https://unsplash-collection-omega.vercel.app/)**
  |
  **[Solution](https://github.com/snigdha-sukun/unsplash-collection)**
  |
  **[Challenge](https://devchallenges.io/challenge/unsplash-collection)**

<!-- TABLE OF CONTENTS -->

## Table of Contents

- [Overview](#overview)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Built with](#built-with)
- [Features](#features)
- [Author](#author)

<!-- OVERVIEW -->

## Overview

![screenshot](screenshot.gif)

<!--
Introduce your projects by taking a screenshot or a gif. Try to tell visitors a story about your project by answering:

- What have you learned/improved?
- Your wisdom? :)
-->

### What I learned

<!-- Use this section to recap over some of your major learnings while working through this project. Writing these out and providing code samples of areas you want to highlight is a great way to reinforce your own knowledge. -->

#### Backend

I learned how to setup mongoose in Next.js:

```ts
import mongoose from "mongoose";
import type { Connection } from "mongoose";

let client: Connection | null = null;
const MONGODB_URI = process.env.MONGODB_URI?.replace(
 "${MONGODB_PASSWORD}",
 process.env.MONGODB_PASSWORD ?? "",
);

if (!MONGODB_URI) {
 throw new Error("MONGODB_URI is not defined");
}

interface DbConnection {
 client: Connection;
}

async function connectToDb(): Promise<DbConnection> {
 if (client) {
  return { client };
 }

 await mongoose.connect(MONGODB_URI as string);

 client = mongoose.connection;

 console.log("Connected to the Database");
 return { client };
}

export default connectToDb;
```

I learned how to make api calls to external urls:

```ts
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
 const searchParams = request.nextUrl.searchParams;
 const query = searchParams.get("query");
 const page = searchParams.get("page") ?? 1;
 const res = await fetch(
  `${process.env.UNSPLASH_API_URI}/search/photos?query=${query}&page=${page}`,
  {
   headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
   },
  },
 );
 const data = await res.json();

 return NextResponse.json({ data });
}
```

I learned how to refer to another scheme when defining a mongoose schema:

```ts
import { Schema, model, models } from "mongoose";

const CollectionSchema = new Schema({
 name: {
  type: String,
  required: true,
  trim: true,
  maxlength: 50,
 },
 coverImage: { type: String },
 images: [
  {
   type: Schema.Types.ObjectId,
   ref: "Image",
  },
 ],
 createdAt: { type: Date, default: Date.now },
 updatedAt: { type: Date, default: Date.now },
});

CollectionSchema.pre("save", function (next) {
 this.updatedAt = new Date();
 next();
});

CollectionSchema.index({ name: 1 });
CollectionSchema.index({ coverImage: 1 });
CollectionSchema.index({ images: 1 });

export default models.Collection ||  model("Collection", CollectionSchema);
```

I leanred how to make db calls using `route.ts` and fetch dynamic route params by using `{params}: { params: Promise<{ collectionId: string, photoId: string }>}` to use it:

```ts
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/MongodbConnect";
import ImageModel from "@/models/ImageModel";
import CollectionModel from "@/models/CollectionModel";

export async function DELETE(
  request: NextRequest,
  {params}: { params: Promise<{ collectionId: string, photoId: string }>}
): Promise<NextResponse> {
  try {
    await dbConnect();
    const { collectionId, photoId } = await params;

    const [image, collection] = await Promise.all([
      ImageModel.findOne({ unsplashId: photoId }),
      CollectionModel.findById(collectionId)
    ]);

    if (!image || !collection) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    const shouldRemoveCover = collection.coverImage === image.url;

    await Promise.all([
      ImageModel.updateOne(
        { _id: image._id },
        { $pull: { collections: collectionId } }
      ),
      CollectionModel.findByIdAndUpdate(
        collectionId,
        {
          $pull: { images: image._id },
          ...(shouldRemoveCover && { $unset: { coverImage: "" } })
        },
        { new: true }
      )
    ]);

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

#### Frontend

I learned how to setup `react-query`:

```tsx
"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function ReactQueryProvider({ children }: { readonly children: React.ReactNode }) {
 return (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
 );
}
```

I learned how to use `react-query` to fetch api calls:

```ts
"use client";

import { useQuery } from "@tanstack/react-query";

export const useFetchImageDetails = ({ id }: { id: string }) => {
 const fetchImageDetails = async (id: string) => {
  const res = await fetch(`/api/photos/${id}`);
  return res.json();
 };
 const { data, isLoading, error } = useQuery({
  queryKey: ["unsplashImageDetails", id],
  queryFn: () => fetchImageDetails(id),
  enabled: !!id,
 });

 return { data, isLoading, error };
};
```

I learned how to use `react-query` to mutate api calls & invalidate existing query results:

```ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useAddPhotoToCollection = (photoId: string) => {
 const addPhotoToCollection = async ({
  collectionId,
  photoId,
 }: { collectionId: string; photoId: string }) => {
  await fetch(`/api/collections/${collectionId}/photos`, {
   method: "POST",
   headers: { "Content-Type": "application/json" },
   body: JSON.stringify({ photoId }),
  });
 };

 const queryClient = useQueryClient();

 const {
  isPending: isLoading,
  isError,
  isSuccess,
  mutateAsync: addToCollection,
  reset,
 } = useMutation({
  mutationFn: addPhotoToCollection,
  onSuccess: () => {
   queryClient.invalidateQueries({
    queryKey: ["unsplashImageDetails", photoId],
   });
   queryClient.invalidateQueries({
    queryKey: ["collectionsList"],
   });
  },
 });

 return { addToCollection, isLoading, isError, isSuccess, reset };
};
```

I learned how to create a custom Modal in React:

```tsx
"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import {  ModalContent, ModalOverlay } from "./Modal.styled";

interface ModalProps {
 isOpen: boolean;
 onClose: () => void;
 children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
 useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
   if (e.key === "Escape") onClose();
  };

  if (isOpen) {
   document.addEventListener("keydown", handleEscape);
   document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  return () => {
   document.removeEventListener("keydown", handleEscape);
   document.body.style.overflow = "unset";
  };
 }, [isOpen, onClose]);

 if (!isOpen) return null;

 return createPortal(
  <ModalOverlay onClick={onClose}>
   <ModalContent onClick={(e) => e.stopPropagation()}>
    {children}
   </ModalContent>
  </ModalOverlay>,
  document.body,
 );
};

export default Modal;
```

```ts
"use client";
import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-out;
  transition: opacity 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  padding: 2rem;
  border-radius: 0.5rem;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  animation: slideUp 0.3s ease-out;
  transition: transform 0.3s ease-out, opacity 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (min-width: 768px) {
    min-width: 500px;
    max-width: 80%;
  }
`;
```

I learned how to create a gradient effect in text:

```ts
export const StyledHeading = styled.h1`
  font-size: 2.25rem;
  font-weight: ${({ theme }) => theme.fontWeights.bolder};
  background: linear-gradient(to right, #F2C593, #8A3282);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  -webkit-text-fill-color: transparent;
`;

```

I learned how to display images of different sizes in a grid:

```ts
export const ImageGridContainer = styled.div<{ $columns: number }>`
  column-count: ${({ $columns }) => $columns};
  column-gap: 2rem;
  width: 100%;
  height: 100%;
`;
```

I learned that I need to add a few things to `next.config.ts` when using images from external sources with `<Image>` from `next/image`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 compiler: {
  styledComponents: true,
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "images.unsplash.com",
    port: "",
    pathname: "/**",
   },
  ],
 },
};

export default nextConfig;
```

I learned about React Suspense:

Alright! Let’s break it down **super simple**—no complicated jargon.

---

##### **🤔 What is React Suspense?**

Imagine you’re **ordering food at a restaurant**. Some dishes take longer to prepare, so while you wait, the restaurant gives you **a free snack** to keep you busy.

**React Suspense** works the same way. When a part of your website (like a **list of images or a profile page**) takes time to load, **React can show a temporary loading message** instead of making the page feel stuck.

---

##### **🛠 When Should You Use React Suspense?**

Use Suspense **when you are waiting for something to load**, like:

- Fetching data from a database (e.g., user profile, posts, or comments).
- Loading images, videos, or any other media.
- Delaying a component that takes time to render (e.g., a big graph).

Instead of showing **a blank screen**, Suspense **shows a nice loading indicator**.

---

##### **✅ Benefits of Using React Suspense**

1. **Better User Experience** → No blank screens, just smooth loading.
2. **Automatic Loading State** → No need to write extra "isLoading" states manually.
3. **Faster Perceived Speed** → Parts of the app **load gradually** instead of waiting for everything.
4. **Optimized for Performance** → Next.js can **automatically pre-load data** where needed.

---

##### **🚀 When to Use Suspense in Next.js?**

In **Next.js (App Router)**, Suspense is useful when:

- **Fetching data with `useSuspenseQuery`** → You want the component to wait for data.
- **Streaming UI** → Load fast parts first and slower parts later.
- **Lazy Loading Components** → Only load heavy components when needed.

📌 **Example in Next.js**

```tsx
import { Suspense } from "react";
import UserProfile from "./UserProfile";

export default function Page() {
  return (
    <div>
      <h1>Welcome!</h1>
      <Suspense fallback={<p>Loading profile...</p>}>
        <UserProfile />
      </Suspense>
    </div>
  );
}
```

👉 Here, while `UserProfile` **is loading**, it shows `"Loading profile..."` instead of a blank screen.

---

##### **🔹 TL;DR (Too Long; Didn’t Read)**

- **Suspense = "Show something while waiting for data"**
- **Use it for:**
  - Fetching data
  - Loading big components
  - Streaming content in Next.js
- **Benefits** → No blank screens, better speed, and a smoother experience

### Useful resources

- [Put icon inside input element in a form](https://stackoverflow.com/a/917636) - This helped me in adding search icon inside the search bar
- [How To Set Up Mongoose With Typescript In NextJS ?](https://www.geeksforgeeks.org/how-to-set-up-mongoose-with-typescript-in-nextjs/) - This helped me in setting on mongodb & mongoose in Next.js app

### Built with

<!-- This section should list any major frameworks that you built your project using. Here are a few examples.-->

- [Next.js](https://nextjs.org/)
- [Styled Components](https://styled-components.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [Tanstack React Query](https://tanstack.com/query/latest)
- [Moment](https://momentjs.com/)

## Features

<!-- List the features of your application or follow the template. Don't share the figma file here :) -->

This application/site was created as a submission to a [DevChallenges](https://devchallenges.io/challenges-dashboard) challenge.

## Author

- Website [Portfolio](https://snigdha-sukun-portfolio.vercel.app)
- GitHub [@snigdha-sukun](https://github.com/snigdha-sukun)
