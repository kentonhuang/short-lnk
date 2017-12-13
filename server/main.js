import {Meteor} from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import moment from 'moment';

import '../imports/api/users';
import { Links } from '../imports/api/links';
import '../imports/startup/simple-schema-configuration.js';

Meteor.startup(() => {

  let now = new Date();
  console.log(now)

  let momentNow = moment(0)
  console.log(momentNow.format());

  WebApp.connectHandlers.use((req, res, next) => {
    const _id = req.url.slice(1);
    const link = Links.findOne({_id})

    if (link) {
       res.statusCode = 302;
       res.setHeader('Location', link.url);
       res.end();
       Meteor.call('links.trackVisit', _id);
    } else {
      next();
    }
    // res.statusCode = 302;
    // res.setHeader('Location', 'http://www.google.com');
    // res.end();
  });
});
