import { SocialMideaIconDb } from "../social-midea-icon-db.js";


export async function getSocialMideaIcon(req, res) {
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

    return undefined;
}

export async function getSocialMideaIcons(req, res) {
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

    return undefined;
}


export async function createSocialMideaIcon(req, res) {
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

    return undefined;
}


export async function updateSocialMideaIcon(req, res) {
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

    return undefined;
}

export async function deleteSocialMideaIcon(req, res) {
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

    return undefined;
}


