// src/utils/invoice.js

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const downloadInvoice = (order) => {
  const doc = new jsPDF();

  const shipping = order.shippingAddress;

  // ==========================
  // Header
  // ==========================

  doc.setFillColor(34, 139, 34);
  doc.rect(0, 0, 210, 38, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("AIWA FRUITS", 14, 18);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Fresh Fruits • Fresh Life", 14, 27);

  doc.setFont("helvetica", "bold");
  doc.text("INVOICE", 165, 18);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);

  doc.text(
    `Invoice : ${order.invoiceNo || order._id.slice(-6).toUpperCase()}`,
    140,
    25
  );

  doc.text(
    `Date : ${new Date(order.createdAt).toLocaleDateString()}`,
    140,
    31
  );

  // ==========================
  // Customer Card
  // ==========================

  doc.setDrawColor(220);
  doc.setFillColor(248, 248, 248);

  doc.roundedRect(14, 48, 182, 42, 3, 3, "FD");

  doc.setTextColor(34, 139, 34);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);

  doc.text("Customer Details", 18, 57);

  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);

  doc.text(
    `${shipping.firstName} ${shipping.lastName}`,
    18,
    66
  );

  doc.text(shipping.street, 18, 73);

  doc.text(
    `${shipping.city} - ${shipping.postalCode}`,
    18,
    80
  );

  doc.text(
    `Payment : ${order.paymentMethod}`,
    120,
    66
  );

  doc.text(
    `Delivery : ${order.deliveryMethod}`,
    120,
    73
  );

  doc.text(
    `Status : ${order.orderStatus}`,
    120,
    80
  );

  // ==========================
  // Products
  // ==========================

  autoTable(doc, {
    startY: 100,

    head: [["Product", "Qty", "Price", "Total"]],

    body: order.items.map((item) => [
      item.productName,
      item.quantity,
      `Rs. ${item.price}`,
      `Rs. ${item.subtotal}`,
    ]),

    theme: "grid",

    styles: {
      fontSize: 10,
      cellPadding: 4,
      halign: "center",
      valign: "middle",
    },

    headStyles: {
      fillColor: [34, 139, 34],
      textColor: 255,
      fontStyle: "bold",
      halign: "center",
    },

    bodyStyles: {
      textColor: 50,
    },

    alternateRowStyles: {
      fillColor: [245, 245, 245],
    },
  });

  // ==========================
  // Total Card
  // ==========================

  const finalY = doc.lastAutoTable.finalY + 15;

  doc.setDrawColor(34, 139, 34);
  doc.setFillColor(240, 255, 240);

  doc.roundedRect(120, finalY - 5, 76, 24, 3, 3, "FD");

  doc.setFont("helvetica", "bold");
  doc.setTextColor(34, 139, 34);
  doc.setFontSize(12);

  doc.text("Grand Total", 126, finalY + 3);

  doc.setFontSize(16);

  doc.text(
    `Rs. ${order.totalAmount}`,
    126,
    finalY + 12
  );

  // ==========================
  // Footer
  // ==========================

  doc.setDrawColor(220);
  doc.line(14, 272, 196, 272);

  doc.setFont("helvetica", "italic");
  doc.setTextColor(120);
  doc.setFontSize(10);

  doc.text(
    "Thank you for shopping with AIWA Fruits!",
    105,
    280,
    {
      align: "center",
    }
  );

  doc.setFontSize(9);

  doc.text(
    "Fresh • Healthy • Delivered with Care",
    105,
    286,
    {
      align: "center",
    }
  );

  doc.save(`Invoice-${order._id}.pdf`);
};