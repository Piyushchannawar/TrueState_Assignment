import Sales from "../models/sales.model.js";

export const getSales = async (req, res) => {
  try {
    const {
      search,
      region,
      gender,
      minAge,
      maxAge,
      category,
      tags,
      payment,
      startDate,
      endDate,
      sortBy,
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { customerName: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
      ];
    }

    if (region) query.customerRegion = { $in: region.split(",") };
    if (gender) query.gender = { $in: gender.split(",") };
    if (category) query.productCategory = { $in: category.split(",") };
    if (tags) query.tags = { $in: tags.split(",") };
    if (payment) query.paymentMethod = { $in: payment.split(",") };

    if (minAge || maxAge) {
      query.age = {};
      if (minAge) query.age.$gte = Number(minAge);
      if (maxAge) query.age.$lte = Number(maxAge);
    }

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const sortOptions = {};
    if (sortBy === "date") sortOptions.date = -1;
    if (sortBy === "quantity") sortOptions.quantity = -1;
    if (sortBy === "name") sortOptions.customerName = 1;

    const skip = (page - 1) * limit;

    const results = await Sales.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(Number(limit));

    const total = await Sales.countDocuments(query);

    res.json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      results,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
