import mongoose from "mongoose";

export = {
  connectMongoose: async function () {
    try {
      await mongoose.connect(process.env.MONGO_URI, { dbName: "notes_keeper" });
      console.log(
        `${
          process.env.PORT || 3110
        }|KEEPER-V2-API MongoDB Default Connection Established`
      );
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  },
};
