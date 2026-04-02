const Announcement = require('../models/Announcement');

const getAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find({ isActive: true })
      .sort({ displayOrder: 1, createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error });
  }
};

const getAllAnnouncements = async (req, res) => {
  try {
    const announcements = await Announcement.find()
      .sort({ displayOrder: 1, createdAt: -1 });
    res.json(announcements);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcements', error });
  }
};

const getAnnouncementById = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);
    if (announcement) {
      res.json(announcement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching announcement', error });
  }
};

const createAnnouncement = async (req, res) => {
  try {
    const { text, isActive, displayOrder, endDate } = req.body;

    if (!text) {
      return res.status(400).json({ message: 'Announcement text is required' });
    }

    const announcement = new Announcement({
      text,
      isActive,
      displayOrder,
      endDate
    });

    const createdAnnouncement = await announcement.save();
    res.status(201).json(createdAnnouncement);
  } catch (error) {
    res.status(500).json({ message: 'Error creating announcement', error });
  }
};

const updateAnnouncement = async (req, res) => {
  try {
    const { text, isActive, displayOrder, endDate } = req.body;
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      if (text !== undefined) announcement.text = text;
      if (isActive !== undefined) announcement.isActive = isActive;
      if (displayOrder !== undefined) announcement.displayOrder = displayOrder;
      if (endDate !== undefined) announcement.endDate = endDate;
      announcement.updatedAt = Date.now();

      const updatedAnnouncement = await announcement.save();
      res.json(updatedAnnouncement);
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating announcement', error });
  }
};

const deleteAnnouncement = async (req, res) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (announcement) {
      await announcement.deleteOne();
      res.json({ message: 'Announcement removed' });
    } else {
      res.status(404).json({ message: 'Announcement not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting announcement', error });
  }
};

module.exports = {
  getAnnouncements,
  getAllAnnouncements,
  getAnnouncementById,
  createAnnouncement,
  updateAnnouncement,
  deleteAnnouncement
};
