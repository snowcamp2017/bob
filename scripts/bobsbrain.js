// Description:
//   <description of the scripts functionality>
// ...
'use strict';

const fetch = require('node-fetch');

module.exports =  (robot) =>  {

  robot.messageRoom('general', 'Hello :earth_africa:')

  robot.hear(/bob yo/, (res) => {
    //let text = res.envelope.message.text;
    //console.log("👽", text)
    res.send(`yo ${res.message.user.name}`);
  });

  robot.hear(/tired|too hard|upset|bored/i, (res) => {
    res.send(`😡 ${res.message.user.name}`);
  });

  robot.hear(/bob help me with (.*)/i, (res) => {
    res.send(`help yourself with ${res.match[1]} 😜`);
  });

  // listen to webhook(s) from GitHub platform
  robot.router.post(process.env.FROM_GITHUB_HOOK, (req, res) => {

    let event = req.headers['x-github-event'];

    let messages = []

    if(event=="issues") {
      messages.push(`issue: "${req.body.issue.title}" by ${req.body.issue.user.login} `);
      messages.push(`issue url: ${req.body.issue.html_url}`);
    }

    if(event=="issue_comment") {
      messages.push(`issue comment by ${req.body.comment.user.login} `);
      messages.push(`comment url: ${req.body.comment.html_url}`);
    }
    messages.push("\n\n");

    robot.messageRoom('ops', messages.join(""));

    console.log("🤖", messages.join(""))

    res.status(200).end()

  })

};
