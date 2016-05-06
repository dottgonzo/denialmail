
import * as bluebird from "bluebird";

import Nodemailer = require("nodemailer");

interface Imail {

    from: string;
    to: string; // list of receivers 
    subject: string; // Subject line 
    text: string;
    html: string;

}


export = class DenialMail {

    from: string;
    name: string;
    to: string;
    transporter: Nodemailer.Transporter;

    constructor(from: string, password: string, to: string, fromname?: string) {

        this.from = from;
        this.to = from;

        if (fromname) this.name = fromname;
        this.transporter = Nodemailer.createTransport("smtps://" + from.split("@")[0] + "%40gmail.com:" + password + "@smtp.gmail.com");
    }

    send(text: string,subject?:string) {
        return new Promise(function(resolve, reject) {

            let html = text

let subj=subject;



            let mailOptions: Imail = {
                from: '"' + this.name + '" <' + this.from + '>', // sender address 
                to: this.to, // list of receivers 
                subject: subj, // Subject line 
                text: html, // plaintext body 
                html: html // html body 
            };

        
            // send mail with defined transport object 
            this.transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    reject(error);
                } else {
                    resolve(info);
                }


            });

        })
    }
}