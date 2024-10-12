const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'biztracker33@gmail.com', //generate new mail new pass key
        pass: 'oxvaptmwbhtroycf'
    }
});

function sendDetails(data: any) {
    return `<div style=background:#fff;font-family:Roboto,sans-serif;width:700px><div style=padding:0;margin:0><div style="border:1px solid #000;border-bottom:none;padding:5px 15px;padding-bottom:10px;background:#2065a8;color:#fff;border-top-left-radius:15px;border-top-right-radius:15px"><div>
    <h1 style="font-size:1.7rem;margin:15px 5px;text-align:end">Rapport</h1></div><div><h2 style=color:#fff;font-size:1.2rem;margin:5px;text-align:end>Restaurant : ${data.restaurant.name}</h2><h2 style=color:#fff;font-size:1.2rem;margin:5px;text-align:end>Employé : ${data.user.name}</h2><h2 style=color:#fff;font-size:1.2rem;margin:5px;text-align:end>Date&Heure : ${data.dateTime}</h2></div></div><div style="border:1px solid #000;border-top:none;border-bottom-left-radius:15px;border-bottom-right-radius:15px;padding:20px 15px;color:#000"><div><table style=margin-bottom:10px;width:100%>
    <tr><th style=text-align:start>Article<th style=text-align:center;width:25%>Minimum<th style=text-align:end;width:25%>Valeur sélectionnée</table></div><hr><div><table style=width:100%>${generateRows(data.generatedReport)}</table></div></div></div></div>`
}

function generateRows(data: any) {
    let toret = '';
    data.forEach((stockItem: any, idx: number) => {
        const toAppend = `
        <tr style="${parseFloat(stockItem.selectedValue) < parseFloat(stockItem.minimum) ? 'rgb(225 127 140 / 50%)' : idx % 2 ? 'background:rgb(127 177 225 / 50%)' : 'white'};">
            <td style="overflow-wrap: anywhere;">${stockItem.name}</td>
            <td style="overflow-wrap: anywhere;text-align:end; width: 25%;">${stockItem.minimum}</td>
            <td style="overflow-wrap: anywhere;text-align:end; width: 25%;">${stockItem.selectedValue}</td>
        </tr>
      `;
        toret += toAppend;
    });
    return toret;
}

let sendMail = async (data: any) => {
    const reportName = "Rapport Generer Par " + data.user.name + ' Pour ' + data.restaurant.name + ` ${data.dateTime}`;
    const mailOptions = {
        from: "MicroERP",
        //to: 'ghassen.hentati@hotmail.com',
        to: 'affesachraf70@gmail.com',
        cc: 'affesachraf70@gmail.com',
        subject: reportName,
        html: sendDetails(data),
    };
    transporter.sendMail(mailOptions, (error: any, info: any) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

export { sendMail };