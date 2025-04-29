import moongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await moongoose.connect(process.env.MOONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "MongoDB connected",
      conn.connection.host,
      conn.connection.port
    );
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};
