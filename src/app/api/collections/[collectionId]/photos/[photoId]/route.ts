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