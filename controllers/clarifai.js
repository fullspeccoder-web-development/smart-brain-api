// gRPC Client
import { ClarifaiStub, grpc } from "clarifai-nodejs-grpc";

const stub = ClarifaiStub.grpc();

const metadata = new grpc.Metadata();
metadata.set(
  "authorization",
  "Key " + process.env.PERSONAL_ACCESS_TOKEN_CLARIFAI
);

const handleClarifai = (req, res) => {
  stub.PostModelOutputs(
    {
      // This is the model ID of a publicly available General model. You may use any other public or custom model ID.
      model_id: "face-detection",
      user_app_id: { user_id: "clarifai", app_id: "main" },
      inputs: [{ data: { image: { url: req.body.imageUrl } } }],
    },
    metadata,
    (err, response) => {
      if (err) {
        console.log("Error: " + err);
        return;
      }

      if (response.status.code !== 10000) {
        console.log(
          "Received failed status: " +
            response.status.description +
            "\n" +
            response.status.details
        );
        return;
      }

      console.log("Predicted concepts, with confidence values:");
      for (const c of response.outputs[0].data.concepts) {
        console.log(c.name + ": " + c.value);
      }

      res.json(response);
    }
  );
};

module.exports = {
  handleClarifai,
};
