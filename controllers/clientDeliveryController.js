import * as deliveryService from "../services/clientDeliveryServices.js";

export const createClientDelivery = async (req, res) => {
  try {
    const deliveryData = req.body;
    const newDelivery = await deliveryService.createClientDelivery(deliveryData);
    res.status(201).json(newDelivery);
  } catch (error) {
    console.error("Error creating client delivery", error);
    res.status(500).json({ message: "Failed to create delivery", error: error.message });
  }
};

export const getClientDeliveries = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deliveries = await deliveryService.getClientDeliveries(userId);
    res.status(200).json(deliveries);
  } catch (error) {
    console.error("Error fetching client deliveries:", error);
    res.status(500).json({ message: "Failed to fetch deliveries", error: error.message });
  }
};


export const getClientDeliveryById = async (req, res) => {
  try {
    const { deliveryId, userId } = req.params;

    const delivery = await deliveryService.getClientDeliveryById(deliveryId, userId);

    if (!delivery) {
      return res.status(404).json({ message: "Delivery not found or access denied." });
    }

    res.status(200).json(delivery);
  } catch (error) {
    console.error("Error fetching delivery by ID:", error);
    res.status(500).json({ message: "Failed to fetch delivery", error: error.message });
  }
};

export const getDriverDeliveryById = async (req, res) => {
  try {
    const { driverId } = req.params;
    const { deliveryId } = req.query;

    const result = await deliveryService.getDriverDeliveryById(driverId, deliveryId);

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return res.status(404).json({ message: "No delivery found." });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching driver delivery:", error);
    res.status(500).json({ message: "Failed to fetch driver delivery", error: error.message });
  }
};


export const updateClientDelivery = async (req, res) => {
  try {
    const { deliveryId } = req.params;
    const updateData = req.body;

    const updatedDelivery = await deliveryService.updateClientDelivery(deliveryId, updateData);

    if (!updatedDelivery) {
      return res.status(404).json({ message: "Delivery not found or update failed." });
    }

    res.status(200).json(updatedDelivery);
  } catch (error) {
    console.error("Error updating delivery:", error);
    res.status(500).json({ message: "Failed to update delivery", error: error.message });
  }
};
