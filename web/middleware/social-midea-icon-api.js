import { SocialMideaIconDb } from "../social-midea-icon-db.js";



export default function applySocialMideaIconsApiEndpoints(app) {


    app.get("/api/socialmideaicons", async (req, res) => {
        try {
            const response = await SocialMideaIconDb.list();
            if (response === undefined) {
                res.status(404).send();
            } else {
                return response;
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
      });

      app.get("/api/socialmideaicons/:id", async (req, res) => {
        try {
            const response = await SocialMideaIconDb.read(req.params.id);
            if (response === undefined) {
                res.status(404).send();
            } else {
                return response;
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
      });


  app.post("https://ranjeetprasad123.myshopify.com/admin/api/socialmideaicons", async (req, res) => {
    try {
        const response = await SocialMideaIconDb.create({
            platformID: req.body.platformID,
            platformName: req.body.platformName,
            platformUrl: req.body.platformUrl,
        });
        if (response === undefined) {
            res.status(404).send();
        } else {
            return response;
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
  });

  app.patch("/api/socialmideaicons/:id", async (req, res) => {
    const icon = await SocialMideaIconDb.read(req.params.id);

    if (icon) {
        try {
            const response = await SocialMideaIconDb.update(req.params.id, {
                platformID: req.body.platformID,
                platformName: req.body.platformName,
                platformUrl: req.body.platformUrl,
            });
            if (response === undefined) {
                res.status(404).send();
            } else {
                return response;
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
  });


  app.delete("/api/socialmideaicons/:id", async (req, res) => {
    const icon = await SocialMideaIconDb.read(req.params.id);
    if (icon) {
        try {
            const response = await SocialMideaIconDb.delete(req.params.id);
            if (response === undefined) {
                res.status(404).send();
            } else {
                return response;
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
  });
}
