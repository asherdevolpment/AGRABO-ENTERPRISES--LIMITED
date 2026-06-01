const { SiteSetting } = require('../models');

async function getSettings(req, res) {
  try {
    const settings = await SiteSetting.findByPk(1);
    return res.json(settings);
  } catch (error) {
    return res.status(500).json({ message: 'Could not load settings', error: error.message });
  }
}

async function updateSettings(req, res) {
  try {
    const [settings] = await SiteSetting.findOrCreate({
      where: { id: 1 },
      defaults: { whatsappNumber: process.env.WHATSAPP_NUMBER || '256706506319' }
    });
    await settings.update(req.body);
    return res.json(settings);
  } catch (error) {
    return res.status(400).json({ message: 'Could not update settings', error: error.message });
  }
}

module.exports = { getSettings, updateSettings };
