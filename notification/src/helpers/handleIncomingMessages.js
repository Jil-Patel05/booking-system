const { sendEmail } = require("./sendMail");

const handleIncomingMessages = (message) => {
  console.log("message", message);
  const { from, to, subject, html } = message;
  sendEmail({
    from,
    to,
    subject,
    html,
  });
};

module.exports = { handleIncomingMessages };
