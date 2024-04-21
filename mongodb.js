const mongoose = require('mongoose');
const { envirionments } = require('./environments');

mongoose.connect(`mongodb+srv://${envirionments.mongoDBUser}:${envirionments.mongoDBPassword}@${envirionments.mongoDBHost}/${envirionments.mongoDBDatabase}?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.error('Could not connect to MongoDB...', err));

const receiptSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    store: {
        name: String,
        address: String,
        city: String,
        country: String,
        telephone: String
    },
    invoice: {
        invoice_type: String,
        number: String,
        issue_date: String,
        issue_time: String
    },
    items: [{
        sku: String,
        description: String,
        imei_series: String,
        quantity: Number,
        unit_price: mongoose.Decimal128,
        total: mongoose.Decimal128
    }],
    totals: {
        free_operations: mongoose.Decimal128,
        exempt_operations: mongoose.Decimal128,
        net_tax: mongoose.Decimal128,
        total_discounts: mongoose.Decimal128,
        sale_value: mongoose.Decimal128,
        igv: mongoose.Decimal128,
        total_sale: mongoose.Decimal128
    },
    payment: {
        method: String,
        amount: mongoose.Decimal128,
        currency: String,
        amount_in_words: String
    },
    client: {
        ruc: String,
        name: String,
        address: String
    },
    warranty_policy: {
        cellphones_electric_vehicles: String,
        accessories: String,
        power_banks_tv_box_others: String,
        bluetooth_headphones: String,
        cables_wired_headphones: String,
        return_period: String,
        money_return: String
    },
    document_details: {
        document_type: String,
        document_number: String,
        document_date: String
    },
    category: String,
    subcategory: String,
    data_in_text: String,
    image_key: { type: String, default: null },
    createdAt: { type: Date, default: Date.now },
    chat: {
        id: Number,
        first_name: String,
        last_name: String,
        username: String,
        "type": String,
    }
});

const Receipt = mongoose.model('Receipt', receiptSchema);

const saveReceiptInfo = async (receiptData) => {
    try {
        const receipt = new Receipt(receiptData);
        const mongodbResult = await receipt.save();
        return mongodbResult._id;
    } catch (error) {
        console.log({ error });
    }
};

module.exports = { saveReceiptInfo };
