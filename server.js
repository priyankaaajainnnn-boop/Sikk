import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;
const HOST = '0.0.0.0';

const staticDir = path.join(__dirname, 'sikshasetu');

// Safely resolve data directory with read-only / serverless fallback (Vercel)
let dataDir = path.join(__dirname, 'data');
let isFsWritable = false;
try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  const testFile = path.join(dataDir, '.write-test');
  fs.writeFileSync(testFile, '1');
  fs.unlinkSync(testFile);
  isFsWritable = true;
} catch (e) {
  // If filesystem is read-only (such as Vercel Lambda), fallback to /tmp
  dataDir = path.join('/tmp', 'sikshasetu-data');
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    isFsWritable = true;
  } catch (err2) {
    isFsWritable = false;
  }
}

const ordersFilePath = path.join(dataDir, 'orders.json');
const authFilePath = path.join(dataDir, 'admin-auth.json');

// Default initial seed orders
const DEFAULT_ORDERS = [
  {
    "enrollmentId": "SKS-2026-00001",
    "fullName": "Gautam Chaurasiya",
    "mobile": "+91 83629 50628",
    "email": "gautam.chaurasiya125@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-19T03:34:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "620003238177",
      "paymentDate": "2026-07-19",
      "submittedAt": "2026-07-19T03:34:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00002",
    "fullName": "Randeep Singh",
    "mobile": "+91 68266 00539",
    "email": "randeep.singh242@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1300,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-19T04:00:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "957170612717",
      "paymentDate": "2026-07-19",
      "submittedAt": "2026-07-19T04:00:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00003",
    "fullName": "Jaswant",
    "mobile": "+91 91341 26396",
    "email": "jaswant704@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 200,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-19T07:40:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "310685741772",
      "paymentDate": "2026-07-19",
      "submittedAt": "2026-07-19T07:40:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00004",
    "fullName": "Km Vandana",
    "mobile": "+91 73498 17734",
    "email": "km.vandana195@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-19T18:32:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "310725590925",
      "paymentDate": "2026-07-19",
      "submittedAt": "2026-07-19T18:32:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00005",
    "fullName": "Sagar Prakashbhai Purohit",
    "mobile": "+91 67026 32297",
    "email": "sagar.purohit716@gmail.com",
    "city": "India",
    "courseSlug": "pa-303",
    "courseName": "Python for Data Analytics & Automation",
    "courseId": "PA-303",
    "coursePrice": 5000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-19T18:32:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "310725549267",
      "paymentDate": "2026-07-19",
      "submittedAt": "2026-07-19T18:32:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00006",
    "fullName": "Hanif Ahmed Choudhury",
    "mobile": "+91 93366 96312",
    "email": "hanif.choudhury833@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-19T18:33:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "506478917369",
      "paymentDate": "2026-07-19",
      "submittedAt": "2026-07-19T18:33:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00007",
    "fullName": "Barun Kumar Singh",
    "mobile": "+91 89691 19330",
    "email": "barun.singh703@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-20T00:25:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "610658194497",
      "paymentDate": "2026-07-20",
      "submittedAt": "2026-07-20T00:25:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00008",
    "fullName": "Abdulkhader",
    "mobile": "+91 78496 21470",
    "email": "abdulkhader877@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 19999,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-20T22:46:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "620116636863",
      "paymentDate": "2026-07-20",
      "submittedAt": "2026-07-20T22:46:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00009",
    "fullName": "Bheema Mahesh Babu",
    "mobile": "+91 82669 44844",
    "email": "bheema.babu448@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-20T22:46:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "310809970993",
      "paymentDate": "2026-07-20",
      "submittedAt": "2026-07-20T22:46:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00010",
    "fullName": "Prasanjit Datta",
    "mobile": "+91 82097 47451",
    "email": "prasanjit.datta881@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-20T22:47:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "656766556337",
      "paymentDate": "2026-07-20",
      "submittedAt": "2026-07-20T22:47:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00011",
    "fullName": "Amirud Jaman Basunia",
    "mobile": "+91 64854 51171",
    "email": "amirud.basunia489@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-20T22:52:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "616731926852",
      "paymentDate": "2026-07-20",
      "submittedAt": "2026-07-20T22:52:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00012",
    "fullName": "Santosh Kumar",
    "mobile": "+91 89666 47391",
    "email": "santosh.kumar718@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 15000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-20T22:55:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "310810231793",
      "paymentDate": "2026-07-20",
      "submittedAt": "2026-07-20T22:55:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00013",
    "fullName": "Arshad",
    "mobile": "+91 96757 70529",
    "email": "arshad847@gmail.com",
    "city": "India",
    "courseSlug": "mo-401",
    "courseName": "MS Office Complete Course",
    "courseId": "MO-401",
    "coursePrice": 8500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-21T07:10:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "485516566637",
      "paymentDate": "2026-07-21",
      "submittedAt": "2026-07-21T07:10:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00014",
    "fullName": "Akhil Kumar Sen",
    "mobile": "+91 66927 49116",
    "email": "akhil.sen487@gmail.com",
    "city": "India",
    "courseSlug": "ae-301",
    "courseName": "Advanced Excel",
    "courseId": "AE-301",
    "coursePrice": 4500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-21T13:40:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "322161959856",
      "paymentDate": "2026-07-21",
      "submittedAt": "2026-07-21T13:40:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00015",
    "fullName": "Chetan Rajendra Patil",
    "mobile": "+91 87199 27151",
    "email": "chetan.patil949@gmail.com",
    "city": "India",
    "courseSlug": "py-201",
    "courseName": "Python Basics",
    "courseId": "PY-201",
    "coursePrice": 5000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-21T14:50:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "656813340277",
      "paymentDate": "2026-07-21",
      "submittedAt": "2026-07-21T14:50:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00016",
    "fullName": "Jitin Bairwa",
    "mobile": "+91 61492 03558",
    "email": "jitin.bairwa821@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 800,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-22T13:22:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "071932010457",
      "paymentDate": "2026-07-22",
      "submittedAt": "2026-07-22T13:22:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00017",
    "fullName": "Jadavani Milan Nitinkumar",
    "mobile": "+91 81856 75980",
    "email": "jadavani.nitinkumar891@gmail.com",
    "city": "India",
    "courseSlug": "mo-401",
    "courseName": "MS Office Complete Course",
    "courseId": "MO-401",
    "coursePrice": 6300,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T15:42:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "610969667979",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T15:42:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00018",
    "fullName": "Arbab Uzzaman Khan",
    "mobile": "+91 65081 57429",
    "email": "arbab.khan987@gmail.com",
    "city": "India",
    "courseSlug": "ae-301",
    "courseName": "Advanced Excel",
    "courseId": "AE-301",
    "coursePrice": 4500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T15:57:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "532130938378",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T15:57:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00019",
    "fullName": "Louis Enterprises",
    "mobile": "+91 82746 48506",
    "email": "louis.enterprises564@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 20000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T16:08:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311092113244",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T16:08:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00020",
    "fullName": "Sapna Bharti",
    "mobile": "+91 78195 95113",
    "email": "sapna.bharti463@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T16:09:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "942837657450",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T16:09:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00021",
    "fullName": "Vanajakumari",
    "mobile": "+91 67540 49436",
    "email": "vanajakumari818@gmail.com",
    "city": "India",
    "courseSlug": "gd-202",
    "courseName": "Graphic Designing Basics",
    "courseId": "GD-202",
    "coursePrice": 4000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T16:22:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "198212501282",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T16:22:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00022",
    "fullName": "Badabhagni Konajanardhan Raju",
    "mobile": "+91 72754 52091",
    "email": "badabhagni.raju646@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T16:28:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "460817437958",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T16:28:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00023",
    "fullName": "Saurav Kumar",
    "mobile": "+91 87871 94506",
    "email": "saurav.kumar488@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T16:28:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "086071973443",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T16:28:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00024",
    "fullName": "Muhammad Sufiyan H",
    "mobile": "+91 89249 70419",
    "email": "muhammad.h801@gmail.com",
    "city": "India",
    "courseSlug": "hc-201",
    "courseName": "HTML & CSS Basics",
    "courseId": "HC-201",
    "coursePrice": 3500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T16:28:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "657228723317",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T16:28:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00025",
    "fullName": "Mohsin Enterprises",
    "mobile": "+91 69644 11347",
    "email": "mohsin.enterprises334@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T16:29:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "139781885464",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T16:29:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00026",
    "fullName": "Yogender Sharma",
    "mobile": "+91 81710 69472",
    "email": "yogender.sharma510@gmail.com",
    "city": "India",
    "courseSlug": "gd-202",
    "courseName": "Graphic Designing Basics",
    "courseId": "GD-202",
    "coursePrice": 4500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T17:08:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "620645291940",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T17:08:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00027",
    "fullName": "V Chittibabu",
    "mobile": "+91 83283 06011",
    "email": "v.chittibabu680@gmail.com",
    "city": "India",
    "courseSlug": "mw-105",
    "courseName": "Microsoft Word",
    "courseId": "MW-105",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T17:09:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "495413886045",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T17:09:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00028",
    "fullName": "V Chittibabu",
    "mobile": "+91 92534 07200",
    "email": "v.chittibabu505@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T17:16:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "386320931717",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T17:16:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00029",
    "fullName": "T Thirumala",
    "mobile": "+91 78999 25830",
    "email": "t.thirumala242@gmail.com",
    "city": "India",
    "courseSlug": "tb-203",
    "courseName": "Tally Basics",
    "courseId": "TB-203",
    "coursePrice": 3500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T17:32:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "750066504106",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T17:32:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00030",
    "fullName": "D V R",
    "mobile": "+91 97265 63708",
    "email": "d.r864@gmail.com",
    "city": "India",
    "courseSlug": "tb-203",
    "courseName": "Tally Basics",
    "courseId": "TB-203",
    "coursePrice": 3500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T17:57:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "620617793776",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T17:57:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00031",
    "fullName": "Kiran Mallik",
    "mobile": "+91 72485 32577",
    "email": "kiran.mallik470@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T18:37:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311102629316",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T18:37:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00032",
    "fullName": "Kaushik Prasher",
    "mobile": "+91 62177 34861",
    "email": "kaushik.prasher193@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T18:38:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311102722651",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T18:38:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00033",
    "fullName": "Ram Dheeraj",
    "mobile": "+91 79504 88739",
    "email": "ram.dheeraj742@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-25T18:38:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "305473148303",
      "paymentDate": "2026-07-25",
      "submittedAt": "2026-07-25T18:38:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00034",
    "fullName": "Pooja",
    "mobile": "+91 65131 40753",
    "email": "pooja710@gmail.com",
    "city": "India",
    "courseSlug": "ie-103",
    "courseName": "Internet & Email Basics",
    "courseId": "IE-103",
    "coursePrice": 1500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-26T00:26:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "620756521716",
      "paymentDate": "2026-07-26",
      "submittedAt": "2026-07-26T00:26:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00035",
    "fullName": "Abin E P",
    "mobile": "+91 96681 32202",
    "email": "abin.p710@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1200,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-26T01:19:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "620774075404",
      "paymentDate": "2026-07-26",
      "submittedAt": "2026-07-26T01:19:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00036",
    "fullName": "Rahul Balmike",
    "mobile": "+91 68304 48745",
    "email": "rahul.balmike666@gmail.com",
    "city": "India",
    "courseSlug": "mp-107",
    "courseName": "Microsoft PowerPoint",
    "courseId": "MP-107",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-30T13:06:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "462955475219",
      "paymentDate": "2026-07-30",
      "submittedAt": "2026-07-30T13:06:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00037",
    "fullName": "Ashwinkumar Prakash Vise",
    "mobile": "+91 89252 76600",
    "email": "ashwinkumar.vise798@gmail.com",
    "city": "India",
    "courseSlug": "ie-103",
    "courseName": "Internet & Email Basics",
    "courseId": "IE-103",
    "coursePrice": 1900,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-30T13:06:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "489331524013",
      "paymentDate": "2026-07-30",
      "submittedAt": "2026-07-30T13:06:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00038",
    "fullName": "Ranjit Sinha",
    "mobile": "+91 85668 25638",
    "email": "ranjit.sinha214@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 50000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-30T13:15:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "611252749555",
      "paymentDate": "2026-07-30",
      "submittedAt": "2026-07-30T13:15:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00039",
    "fullName": "Ritesh Anand",
    "mobile": "+91 68753 40444",
    "email": "ritesh.anand564@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 23000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-07-30T16:00:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "203458396133",
      "paymentDate": "2026-07-30",
      "submittedAt": "2026-07-30T16:00:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00040",
    "fullName": "Rapaka Sunny Vijay Krishna",
    "mobile": "+91 76451 19047",
    "email": "rapaka.krishna369@gmail.com",
    "city": "India",
    "courseSlug": "dm-205",
    "courseName": "Digital Marketing Basics",
    "courseId": "DM-205",
    "coursePrice": 4500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T10:25:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "275577678995",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T10:25:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00041",
    "fullName": "Sunilkumar",
    "mobile": "+91 87860 66793",
    "email": "sunilkumar991@gmail.com",
    "city": "India",
    "courseSlug": "wd-302",
    "courseName": "Web Designing Basics",
    "courseId": "WD-302",
    "coursePrice": 5000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T10:28:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621382125225",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T10:28:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00042",
    "fullName": "Nihal Singh",
    "mobile": "+91 89187 39736",
    "email": "nihal.singh256@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1400,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T10:34:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621302568088",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T10:34:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00043",
    "fullName": "Vishnu Prajapat",
    "mobile": "+91 67431 11853",
    "email": "vishnu.prajapat652@gmail.com",
    "city": "India",
    "courseSlug": "mw-105",
    "courseName": "Microsoft Word",
    "courseId": "MW-105",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T10:58:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "519482048633",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T10:58:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00044",
    "fullName": "Kannan Sitheswaran",
    "mobile": "+91 62201 17054",
    "email": "kannan.sitheswaran600@gmail.com",
    "city": "India",
    "courseSlug": "ie-103",
    "courseName": "Internet & Email Basics",
    "courseId": "IE-103",
    "coursePrice": 1800,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T10:59:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "234670594590",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T10:59:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00045",
    "fullName": "Murali Gari Balu",
    "mobile": "+91 83571 09965",
    "email": "murali.balu999@gmail.com",
    "city": "India",
    "courseSlug": "tb-203",
    "courseName": "Tally Basics",
    "courseId": "TB-203",
    "coursePrice": 3500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T11:18:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "895685710606",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T11:18:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00046",
    "fullName": "Saumya Srivastava",
    "mobile": "+91 61919 69690",
    "email": "saumya.srivastava346@gmail.com",
    "city": "India",
    "courseSlug": "bcc-102",
    "courseName": "Basic Computer Course",
    "courseId": "BCC-102",
    "coursePrice": 2700,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T11:42:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "509243225498",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T11:42:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00047",
    "fullName": "Pradumna Shamsundar Patil",
    "mobile": "+91 69166 90353",
    "email": "pradumna.patil597@gmail.com",
    "city": "India",
    "courseSlug": "pa-303",
    "courseName": "Python for Data Analytics & Automation",
    "courseId": "PA-303",
    "coursePrice": 5000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T16:07:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "212147943426",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T16:07:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00048",
    "fullName": "Deepak Chandna",
    "mobile": "+91 96903 47116",
    "email": "deepak.chandna231@gmail.com",
    "city": "India",
    "courseSlug": "me-106",
    "courseName": "Microsoft Excel",
    "courseId": "ME-106",
    "coursePrice": 2500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T16:11:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311542415703",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T16:11:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00049",
    "fullName": "Deepak Chandna",
    "mobile": "+91 93274 16584",
    "email": "deepak.chandna371@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 22500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T16:12:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311542447536",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T16:12:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00050",
    "fullName": "Kanubhai Vinodbhai Rana",
    "mobile": "+91 78655 23129",
    "email": "kanubhai.rana873@gmail.com",
    "city": "India",
    "courseSlug": "dm-205",
    "courseName": "Digital Marketing Basics",
    "courseId": "DM-205",
    "coursePrice": 4000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T17:12:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "657956395269",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T17:12:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00051",
    "fullName": "Anil Kumar K S",
    "mobile": "+91 85704 06376",
    "email": "anil.s508@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T17:36:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "778176543796",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T17:36:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00052",
    "fullName": "Shivram Tiwari",
    "mobile": "+91 73412 66931",
    "email": "shivram.tiwari223@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 30000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-01T21:34:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311572014573",
      "paymentDate": "2026-08-01",
      "submittedAt": "2026-08-01T21:34:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00053",
    "fullName": "Indira Biswas",
    "mobile": "+91 67316 91672",
    "email": "indira.biswas446@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1002,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-02T01:59:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621401248995",
      "paymentDate": "2026-08-02",
      "submittedAt": "2026-08-02T01:59:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00054",
    "fullName": "Karnam Tirupathi",
    "mobile": "+91 71077 21109",
    "email": "karnam.tirupathi335@gmail.com",
    "city": "India",
    "courseSlug": "pa-303",
    "courseName": "Python for Data Analytics & Automation",
    "courseId": "PA-303",
    "coursePrice": 5000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-02T12:09:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621440065656",
      "paymentDate": "2026-08-02",
      "submittedAt": "2026-08-02T12:09:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00055",
    "fullName": "Nitin Navinbhai Katariya",
    "mobile": "+91 63458 24373",
    "email": "nitin.katariya824@gmail.com",
    "city": "India",
    "courseSlug": "ae-301",
    "courseName": "Advanced Excel",
    "courseId": "AE-301",
    "coursePrice": 4120,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-02T12:10:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "853866179114",
      "paymentDate": "2026-08-02",
      "submittedAt": "2026-08-02T12:10:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00056",
    "fullName": "Vishal Kumar",
    "mobile": "+91 81760 82500",
    "email": "vishal.kumar132@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 800,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-02T12:10:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "733177928822",
      "paymentDate": "2026-08-02",
      "submittedAt": "2026-08-02T12:10:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00057",
    "fullName": "Jay Rameshbhai Barot",
    "mobile": "+91 88183 09417",
    "email": "jay.barot343@gmail.com",
    "city": "India",
    "courseSlug": "de-110",
    "courseName": "Data Entry Basics",
    "courseId": "DE-110",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-02T12:11:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "658086327695",
      "paymentDate": "2026-08-02",
      "submittedAt": "2026-08-02T12:11:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00058",
    "fullName": "Ajay Kumar",
    "mobile": "+91 78766 93898",
    "email": "ajay.kumar319@gmail.com",
    "city": "India",
    "courseSlug": "cd-109",
    "courseName": "Canva Designing",
    "courseId": "CD-109",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-02T12:12:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "003772048549",
      "paymentDate": "2026-08-02",
      "submittedAt": "2026-08-02T12:12:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00059",
    "fullName": "Deepak Jena",
    "mobile": "+91 93609 16298",
    "email": "deepak.jena690@gmail.com",
    "city": "India",
    "courseSlug": "de-110",
    "courseName": "Data Entry Basics",
    "courseId": "DE-110",
    "coursePrice": 2200,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-02T12:17:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "495132156223",
      "paymentDate": "2026-08-02",
      "submittedAt": "2026-08-02T12:17:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00060",
    "fullName": "Shikhar Chourasia",
    "mobile": "+91 93044 51095",
    "email": "shikhar.chourasia926@gmail.com",
    "city": "India",
    "courseSlug": "ca-204",
    "courseName": "Computer Accounting Basics",
    "courseId": "CA-204",
    "coursePrice": 3386,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T00:15:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "212273385162",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T00:15:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00061",
    "fullName": "Aayushi Shukla",
    "mobile": "+91 94804 24119",
    "email": "aayushi.shukla199@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T10:05:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "225722239628",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T10:05:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00062",
    "fullName": "Pratiksha Suhas Bhalkar",
    "mobile": "+91 98828 39238",
    "email": "pratiksha.bhalkar520@gmail.com",
    "city": "India",
    "courseSlug": "tb-203",
    "courseName": "Tally Basics",
    "courseId": "TB-203",
    "coursePrice": 3500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T10:51:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621531624159",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T10:51:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00063",
    "fullName": "Vaibhav Baghel",
    "mobile": "+91 61650 82363",
    "email": "vaibhav.baghel789@gmail.com",
    "city": "India",
    "courseSlug": "ca-204",
    "courseName": "Computer Accounting Basics",
    "courseId": "CA-204",
    "coursePrice": 3000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T10:53:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311663499208",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T10:53:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00064",
    "fullName": "Kapil",
    "mobile": "+91 89596 29660",
    "email": "kapil845@gmail.com",
    "city": "India",
    "courseSlug": "ie-103",
    "courseName": "Internet & Email Basics",
    "courseId": "IE-103",
    "coursePrice": 1600,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T11:15:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "127294082085",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T11:15:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00065",
    "fullName": "Shirish Ramchandra Chaudhari",
    "mobile": "+91 73042 35259",
    "email": "shirish.chaudhari354@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T11:23:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "789267310386",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T11:23:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00066",
    "fullName": "Aditya Hanmamt Jadhav",
    "mobile": "+91 92970 18781",
    "email": "aditya.jadhav243@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T11:28:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621592863124",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T11:28:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00067",
    "fullName": "Gundu Pradeep",
    "mobile": "+91 71809 43908",
    "email": "gundu.pradeep573@gmail.com",
    "city": "India",
    "courseSlug": "gd-202",
    "courseName": "Graphic Designing Basics",
    "courseId": "GD-202",
    "coursePrice": 4800,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T14:51:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "003796914422",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T14:51:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00068",
    "fullName": "Bibin Mohanan",
    "mobile": "+91 61543 18806",
    "email": "bibin.mohanan927@gmail.com",
    "city": "India",
    "courseSlug": "cd-109",
    "courseName": "Canva Designing",
    "courseId": "CD-109",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T14:51:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "127306219371",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T14:51:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00069",
    "fullName": "Pushpa",
    "mobile": "+91 72785 75192",
    "email": "pushpa195@gmail.com",
    "city": "India",
    "courseSlug": "bcc-102",
    "courseName": "Basic Computer Course",
    "courseId": "BCC-102",
    "coursePrice": 2500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T14:52:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "611500726521",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T14:52:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00070",
    "fullName": "Mohan Lal",
    "mobile": "+91 93295 09408",
    "email": "mohan.lal597@gmail.com",
    "city": "India",
    "courseSlug": "gd-202",
    "courseName": "Graphic Designing Basics",
    "courseId": "GD-202",
    "coursePrice": 4000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T15:16:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "656793730507",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T15:16:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00071",
    "fullName": "Nikhil Kumar Lalwani",
    "mobile": "+91 75069 19288",
    "email": "nikhil.lalwani160@gmail.com",
    "city": "India",
    "courseSlug": "gd-202",
    "courseName": "Graphic Designing Basics",
    "courseId": "GD-202",
    "coursePrice": 4200,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T15:20:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "881748052001",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T15:20:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00072",
    "fullName": "Vivek Rameshbhai Gajjar",
    "mobile": "+91 89418 89393",
    "email": "vivek.gajjar499@gmail.com",
    "city": "India",
    "courseSlug": "ae-301",
    "courseName": "Advanced Excel",
    "courseId": "AE-301",
    "coursePrice": 4000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T16:59:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "212316879655",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T16:59:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00073",
    "fullName": "Sambhaji Gopal Shivtare",
    "mobile": "+91 98479 59430",
    "email": "sambhaji.shivtare392@gmail.com",
    "city": "India",
    "courseSlug": "mo-401",
    "courseName": "MS Office Complete Course",
    "courseId": "MO-401",
    "coursePrice": 8000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T18:21:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "658104937756",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T18:21:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00074",
    "fullName": "Sunil Kumar Khatik",
    "mobile": "+91 74185 87604",
    "email": "sunil.khatik258@gmail.com",
    "city": "India",
    "courseSlug": "ie-103",
    "courseName": "Internet & Email Basics",
    "courseId": "IE-103",
    "coursePrice": 1800,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T18:22:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "658139169292",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T18:22:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00075",
    "fullName": "Vinod Gupta",
    "mobile": "+91 69031 32646",
    "email": "vinod.gupta159@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 20000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T18:23:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "910731612084",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T18:23:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00076",
    "fullName": "Akash",
    "mobile": "+91 67272 55918",
    "email": "akash158@gmail.com",
    "city": "India",
    "courseSlug": "tb-203",
    "courseName": "Tally Basics",
    "courseId": "TB-203",
    "coursePrice": 3500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T18:25:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "777668417062",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T18:25:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00077",
    "fullName": "Kusuma Gnaneshwer",
    "mobile": "+91 71610 73976",
    "email": "kusuma.gnaneshwer614@gmail.com",
    "city": "India",
    "courseSlug": "cd-109",
    "courseName": "Canva Designing",
    "courseId": "CD-109",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T18:52:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "721890450429",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T18:52:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00078",
    "fullName": "Parbin Aktar",
    "mobile": "+91 71735 74218",
    "email": "parbin.aktar182@gmail.com",
    "city": "India",
    "courseSlug": "dm-205",
    "courseName": "Digital Marketing Basics",
    "courseId": "DM-205",
    "coursePrice": 4000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T18:57:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621526280652",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T18:57:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00079",
    "fullName": "Govinda",
    "mobile": "+91 75335 50699",
    "email": "govinda169@gmail.com",
    "city": "India",
    "courseSlug": "pa-303",
    "courseName": "Python for Data Analytics & Automation",
    "courseId": "PA-303",
    "coursePrice": 5000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-03T23:52:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "643120824976",
      "paymentDate": "2026-08-03",
      "submittedAt": "2026-08-03T23:52:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00080",
    "fullName": "Ripon Nag",
    "mobile": "+91 77216 09600",
    "email": "ripon.nag683@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T00:31:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "212352922471",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T00:31:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00081",
    "fullName": "Zafar Khan",
    "mobile": "+91 65501 39320",
    "email": "zafar.khan140@gmail.com",
    "city": "India",
    "courseSlug": "de-110",
    "courseName": "Data Entry Basics",
    "courseId": "DE-110",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T03:59:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "598658613079",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T03:59:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00082",
    "fullName": "Atish Aslam",
    "mobile": "+91 78191 12790",
    "email": "atish.aslam367@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T04:00:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "876909137339",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T04:00:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00083",
    "fullName": "Velicheti Seshagiri Rao",
    "mobile": "+91 73852 01412",
    "email": "velicheti.rao421@gmail.com",
    "city": "India",
    "courseSlug": "pa-303",
    "courseName": "Python for Data Analytics & Automation",
    "courseId": "PA-303",
    "coursePrice": 5000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T04:00:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "611535498084",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T04:00:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00084",
    "fullName": "Prasad",
    "mobile": "+91 85909 41149",
    "email": "prasad234@gmail.com",
    "city": "India",
    "courseSlug": "tb-203",
    "courseName": "Tally Basics",
    "courseId": "TB-203",
    "coursePrice": 3500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T04:11:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "602109488153",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T04:11:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00085",
    "fullName": "Robina Khatoon",
    "mobile": "+91 61100 02396",
    "email": "robina.khatoon869@gmail.com",
    "city": "India",
    "courseSlug": "mp-107",
    "courseName": "Microsoft PowerPoint",
    "courseId": "MP-107",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T04:11:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "618259114828",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T04:11:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00086",
    "fullName": "Shanmukha Rao Nalla",
    "mobile": "+91 61786 63096",
    "email": "shanmukha.nalla736@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T04:15:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "658282117375",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T04:15:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00087",
    "fullName": "S K",
    "mobile": "+91 82422 24154",
    "email": "s.k618@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T04:20:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "100585318622",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T04:20:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00088",
    "fullName": "Prakash Iyer",
    "mobile": "+91 74967 76692",
    "email": "prakash.iyer170@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 300,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T07:15:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "143497493769",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T07:15:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00089",
    "fullName": "Ramesh Gupta",
    "mobile": "+91 87567 83995",
    "email": "ramesh.gupta548@gmail.com",
    "city": "India",
    "courseSlug": "me-106",
    "courseName": "Microsoft Excel",
    "courseId": "ME-106",
    "coursePrice": 2500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T07:17:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "896302688663",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T07:17:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00090",
    "fullName": "Gogada Damodhar",
    "mobile": "+91 88123 08209",
    "email": "gogada.damodhar783@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 30000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T08:20:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311722691098",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T08:20:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00091",
    "fullName": "Gogada Damodhar",
    "mobile": "+91 73839 68123",
    "email": "gogada.damodhar999@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T08:20:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311722678948",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T08:20:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00092",
    "fullName": "Thota Raghu",
    "mobile": "+91 73924 31670",
    "email": "thota.raghu209@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T08:29:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311723091507",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T08:29:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00093",
    "fullName": "Veluru Anirudh",
    "mobile": "+91 78705 30217",
    "email": "veluru.anirudh719@gmail.com",
    "city": "India",
    "courseSlug": "ie-103",
    "courseName": "Internet & Email Basics",
    "courseId": "IE-103",
    "coursePrice": 1500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T08:31:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "028699793061",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T08:31:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00094",
    "fullName": "Veluru Anirudh",
    "mobile": "+91 86426 78844",
    "email": "veluru.anirudh308@gmail.com",
    "city": "India",
    "courseSlug": "py-201",
    "courseName": "Python Basics",
    "courseId": "PY-201",
    "coursePrice": 5000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T08:32:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "254278100028",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T08:32:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00095",
    "fullName": "Mohammad Yaseen",
    "mobile": "+91 61991 04722",
    "email": "mohammad.yaseen357@gmail.com",
    "city": "India",
    "courseSlug": "ca-204",
    "courseName": "Computer Accounting Basics",
    "courseId": "CA-204",
    "coursePrice": 3015,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T08:40:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "474989260795",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T08:40:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00096",
    "fullName": "Savitri Ravi Nishad",
    "mobile": "+91 81473 37803",
    "email": "savitri.nishad949@gmail.com",
    "city": "India",
    "courseSlug": "ie-103",
    "courseName": "Internet & Email Basics",
    "courseId": "IE-103",
    "coursePrice": 1575,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T08:45:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "212360246970",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T08:45:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00097",
    "fullName": "Rohit Verma",
    "mobile": "+91 77840 95277",
    "email": "rohit.verma889@gmail.com",
    "city": "India",
    "courseSlug": "ie-103",
    "courseName": "Internet & Email Basics",
    "courseId": "IE-103",
    "coursePrice": 1800,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T08:47:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "228471720401",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T08:47:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00098",
    "fullName": "Syed Ismail",
    "mobile": "+91 96923 62342",
    "email": "syed.ismail265@gmail.com",
    "city": "India",
    "courseSlug": "gw-108",
    "courseName": "Google Workspace",
    "courseId": "GW-108",
    "coursePrice": 2499,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T08:47:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621687810577",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T08:47:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00099",
    "fullName": "Suresh S",
    "mobile": "+91 62201 23666",
    "email": "suresh.s537@gmail.com",
    "city": "India",
    "courseSlug": "dm-205",
    "courseName": "Digital Marketing Basics",
    "courseId": "DM-205",
    "coursePrice": 4500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T19:08:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "658266575703",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T19:08:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00100",
    "fullName": "Roy Pathik",
    "mobile": "+91 76858 23118",
    "email": "roy.pathik807@gmail.com",
    "city": "India",
    "courseSlug": "bcc-102",
    "courseName": "Basic Computer Course",
    "courseId": "BCC-102",
    "coursePrice": 2700,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T19:22:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "658286374452",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T19:22:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00101",
    "fullName": "Aniket Chandrakant Dike",
    "mobile": "+91 87254 64884",
    "email": "aniket.dike954@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 1000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T21:53:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "922367554659",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T21:53:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00102",
    "fullName": "Neeraj Kumar",
    "mobile": "+91 71449 13399",
    "email": "neeraj.kumar540@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 99.9,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T22:18:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621617616267",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T22:18:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00103",
    "fullName": "Suraj Kumar",
    "mobile": "+91 64841 94737",
    "email": "suraj.kumar473@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 99.1,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T22:20:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311781554602",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T22:20:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00104",
    "fullName": "Dilip Singh",
    "mobile": "+91 78161 14302",
    "email": "dilip.singh798@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 99.3,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T22:23:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311781678756",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T22:23:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00105",
    "fullName": "Amit Singh",
    "mobile": "+91 97664 30218",
    "email": "amit.singh898@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 99.7,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T22:25:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "313853017780",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T22:25:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00106",
    "fullName": "V Vimalraj",
    "mobile": "+91 79588 72154",
    "email": "v.vimalraj342@gmail.com",
    "city": "India",
    "courseSlug": "tm-104",
    "courseName": "Typing Mastery",
    "courseId": "TM-104",
    "coursePrice": 199.2,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-04T22:28:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311781939622",
      "paymentDate": "2026-08-04",
      "submittedAt": "2026-08-04T22:28:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00107",
    "fullName": "Puneet Singh",
    "mobile": "+91 62925 87044",
    "email": "puneet.singh522@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 12000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T00:56:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "392477208132",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T00:56:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00108",
    "fullName": "Randeep Singh",
    "mobile": "+91 99613 93416",
    "email": "randeep.singh901@gmail.com",
    "city": "India",
    "courseSlug": "mo-401",
    "courseName": "MS Office Complete Course",
    "courseId": "MO-401",
    "coursePrice": 8000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T01:04:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "611593595378",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T01:04:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00109",
    "fullName": "Randeep Singh",
    "mobile": "+91 79454 36943",
    "email": "randeep.singh373@gmail.com",
    "city": "India",
    "courseSlug": "mo-401",
    "courseName": "MS Office Complete Course",
    "courseId": "MO-401",
    "coursePrice": 8500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T01:05:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311784958654",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T01:05:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00110",
    "fullName": "Aab Alam",
    "mobile": "+91 66053 99561",
    "email": "aab.alam491@gmail.com",
    "city": "India",
    "courseSlug": "ie-103",
    "courseName": "Internet & Email Basics",
    "courseId": "IE-103",
    "coursePrice": 1800,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T02:58:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "847285043398",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T02:58:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00111",
    "fullName": "Sahbaz Ahamd",
    "mobile": "+91 94754 42872",
    "email": "sahbaz.ahamd304@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 20000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T04:17:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "352558943347",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T04:17:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00112",
    "fullName": "Bolishetty Raju",
    "mobile": "+91 73393 62341",
    "email": "bolishetty.raju940@gmail.com",
    "city": "India",
    "courseSlug": "mp-107",
    "courseName": "Microsoft PowerPoint",
    "courseId": "MP-107",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T06:50:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "874254253904",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T06:50:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00113",
    "fullName": "Mahendar Singh",
    "mobile": "+91 75278 49588",
    "email": "mahendar.singh775@gmail.com",
    "city": "India",
    "courseSlug": "cf-101",
    "courseName": "Computer Fundamentals",
    "courseId": "CF-101",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T07:18:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "493866243527",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T07:18:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00114",
    "fullName": "Botcha Sarojini",
    "mobile": "+91 69303 53157",
    "email": "botcha.sarojini385@gmail.com",
    "city": "India",
    "courseSlug": "py-201",
    "courseName": "Python Basics",
    "courseId": "PY-201",
    "coursePrice": 5000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T09:13:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "863234766739",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T09:13:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00115",
    "fullName": "Sathishkumar Ramanujam",
    "mobile": "+91 98296 27019",
    "email": "sathishkumar.ramanujam459@gmail.com",
    "city": "India",
    "courseSlug": "ca-204",
    "courseName": "Computer Accounting Basics",
    "courseId": "CA-204",
    "coursePrice": 3000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T09:13:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621745239131",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T09:13:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00116",
    "fullName": "Dheeraj Kumar Sharma",
    "mobile": "+91 63804 77683",
    "email": "dheeraj.sharma128@gmail.com",
    "city": "India",
    "courseSlug": "fs-501",
    "courseName": "Full-Stack Web Development & AI Diploma",
    "courseId": "FS-501",
    "coursePrice": 25000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T09:22:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "127395829633",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T09:22:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00117",
    "fullName": "Shubham Sharma",
    "mobile": "+91 81410 78352",
    "email": "shubham.sharma694@gmail.com",
    "city": "India",
    "courseSlug": "ae-301",
    "courseName": "Advanced Excel",
    "courseId": "AE-301",
    "coursePrice": 4000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T09:27:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "100668146039",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T09:27:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00118",
    "fullName": "Amit Singh",
    "mobile": "+91 85685 74364",
    "email": "amit.singh453@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 15000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T09:30:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "566868623003",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T09:30:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00119",
    "fullName": "Hutshan Jesu",
    "mobile": "+91 73735 06211",
    "email": "hutshan.jesu494@gmail.com",
    "city": "India",
    "courseSlug": "ca-204",
    "courseName": "Computer Accounting Basics",
    "courseId": "CA-204",
    "coursePrice": 3000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T09:30:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "621719434730",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T09:30:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00120",
    "fullName": "Patel Dhyan Kalpeshbhai",
    "mobile": "+91 91018 15992",
    "email": "patel.kalpeshbhai825@gmail.com",
    "city": "India",
    "courseSlug": "hc-201",
    "courseName": "HTML & CSS Basics",
    "courseId": "HC-201",
    "coursePrice": 3500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T10:46:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "127399829233",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T10:46:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00121",
    "fullName": "Ravindrakumar",
    "mobile": "+91 91751 33802",
    "email": "ravindrakumar472@gmail.com",
    "city": "India",
    "courseSlug": "dg-402",
    "courseName": "Digital Marketing & Growth Mastery",
    "courseId": "DG-402",
    "coursePrice": 10000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T11:20:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "260125006055",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T11:20:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00122",
    "fullName": "Dnyaneshwar Gajanan Theng",
    "mobile": "+91 88123 06873",
    "email": "dnyaneshwar.theng438@gmail.com",
    "city": "India",
    "courseSlug": "dm-205",
    "courseName": "Digital Marketing Basics",
    "courseId": "DM-205",
    "coursePrice": 4500,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T11:39:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "311800079729",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T11:39:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  },
  {
    "enrollmentId": "SKS-2026-00123",
    "fullName": "Sanjay Rao",
    "mobile": "+91 86445 18647",
    "email": "sanjay.rao837@gmail.com",
    "city": "India",
    "courseSlug": "cf-101",
    "courseName": "Computer Fundamentals",
    "courseId": "CF-101",
    "coursePrice": 2000,
    "upiId": "8390217169-1@nyes",
    "paymentStatus": "verified",
    "createdAt": "2026-08-05T11:40:00.000Z",
    "mode": "online",
    "education": "Learner",
    "payment": {
      "utr": "576816355129",
      "paymentDate": "2026-08-05",
      "submittedAt": "2026-08-05T11:40:00.000Z",
      "screenshotB64": null,
      "screenshotName": "verified_upi"
    }
  }
];

// In-memory fallback in case filesystem is restricted
let inMemoryOrders = null;
let inMemoryPassword = 'Mailguy@123';

// Helper functions for orders file storage
function readOrdersFromFile() {
  try {
    if (fs.existsSync(ordersFilePath)) {
      const raw = fs.readFileSync(ordersFilePath, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryOrders = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Error reading primary orders file:', err);
  }

  const rootOrders = path.join(__dirname, 'data', 'orders.json');
  try {
    if (rootOrders !== ordersFilePath && fs.existsSync(rootOrders)) {
      const raw = fs.readFileSync(rootOrders, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        inMemoryOrders = parsed;
        return parsed;
      }
    }
  } catch (e) {}

  if (inMemoryOrders && inMemoryOrders.length > 0) {
    return inMemoryOrders;
  }

  inMemoryOrders = [...DEFAULT_ORDERS];
  return inMemoryOrders;
}

function writeOrdersToFile(orders) {
  inMemoryOrders = orders;
  let written = false;

  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(ordersFilePath, JSON.stringify(orders, null, 2), 'utf-8');
    written = true;
  } catch (err) {
    console.warn('Error writing primary orders file:', err);
  }

  const rootDir = path.join(__dirname, 'data');
  if (rootDir !== dataDir) {
    try {
      if (!fs.existsSync(rootDir)) fs.mkdirSync(rootDir, { recursive: true });
      fs.writeFileSync(path.join(rootDir, 'orders.json'), JSON.stringify(orders, null, 2), 'utf-8');
      written = true;
    } catch (e) {}
  }

  return written || true;
}

// Helper for admin password
function getAdminPassword() {
  try {
    if (fs.existsSync(authFilePath)) {
      const data = JSON.parse(fs.readFileSync(authFilePath, 'utf-8'));
      if (data && data.password) return data.password;
    }
  } catch (e) {
    // fallback
  }
  return inMemoryPassword || 'Mailguy@123';
}

function setAdminPassword(newPassword) {
  inMemoryPassword = newPassword;
  if (!isFsWritable) return true;
  try {
    fs.writeFileSync(authFilePath, JSON.stringify({ password: newPassword, updatedAt: new Date().toISOString() }, null, 2), 'utf-8');
    return true;
  } catch (err) {
    return true;
  }
}

// Middlewares
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Helper to reliably find an HTML file across all potential locations
function findHtmlFile(fileName) {
  const candidates = [
    path.join(__dirname, fileName),
    path.join(process.cwd(), fileName),
    path.join(staticDir, fileName),
    path.join(__dirname, 'sikshasetu', fileName),
    path.join(process.cwd(), 'sikshasetu', fileName)
  ];
  for (const p of candidates) {
    try {
      if (fs.existsSync(p)) return p;
    } catch (e) {}
  }
  return null;
}

function serveHtml(res, fileName) {
  const target = findHtmlFile(fileName);
  if (target) {
    return res.sendFile(target);
  }
  // If static directory has it
  const fallback = path.join(staticDir, fileName);
  return res.sendFile(fallback);
}

// Serve static assets from both root and sikshasetu directories
app.use(express.static(__dirname));
app.use(express.static(staticDir));
app.use('/sikshasetu', express.static(staticDir));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/sikshasetu/js', express.static(path.join(staticDir, 'js')));

// ── Admin Panel Dedicated Routes ──────────────────────────────────────────
// Guarantees /admin, /admin.html, /sikshasetu/admin all open Admin Panel directly
app.get(['/admin', '/admin.html', '/sikshasetu/admin', '/sikshasetu/admin.html'], (req, res) => {
  serveHtml(res, 'admin.html');
});

// Clean URLs for front-facing pages
app.get(['/enroll', '/enroll.html', '/sikshasetu/enroll', '/sikshasetu/enroll.html'], (req, res) => {
  serveHtml(res, 'enroll.html');
});

app.get(['/payment', '/payment.html', '/sikshasetu/payment', '/sikshasetu/payment.html'], (req, res) => {
  serveHtml(res, 'payment.html');
});

app.get(['/confirmation', '/confirmation.html', '/sikshasetu/confirmation', '/sikshasetu/confirmation.html'], (req, res) => {
  serveHtml(res, 'confirmation.html');
});

app.get(['/course', '/course.html', '/sikshasetu/course', '/sikshasetu/course.html'], (req, res) => {
  serveHtml(res, 'course.html');
});

// ── Backend API Endpoints for Orders & Admin ──────────────────────────────

// Admin login verification
app.post('/api/admin/login', (req, res) => {
  const { password } = req.body;
  const currentPassword = getAdminPassword();
  if (password === currentPassword) {
    res.json({ success: true, message: 'Authenticated successfully' });
  } else {
    res.status(401).json({ success: false, message: 'Incorrect admin password' });
  }
});

// Admin change password
app.post('/api/admin/change-password', (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const currentPassword = getAdminPassword();
  if (oldPassword !== currentPassword) {
    return res.status(401).json({ success: false, message: 'Current password does not match' });
  }
  if (!newPassword || newPassword.length < 4) {
    return res.status(400).json({ success: false, message: 'New password must be at least 4 characters long' });
  }
  setAdminPassword(newPassword);
  res.json({ success: true, message: 'Password changed successfully' });
});

// Download sample CSV template endpoint
app.get(['/api/orders/sample-csv', '/api/sample-csv'], (req, res) => {
  const sampleCSV = `"Name","Order id","Upi id","Amount","Date and Time","Course name","Course ID","Email address","transaction id of upi","Payment Status","Mobile"
"Rahul Sharma","SKS-2024-91823","8390217169-1@nyes","19999","25 Sep 2024, 08:00 PM","Full Stack MERN Developer Mastery","FSD-101","rahul.sharma92@gmail.com","426910847291","verified","+91 98765 12345"
"Priya Verma","SKS-2024-91824","8390217169-1@nyes","9999","25 Sep 2024, 09:45 PM","Data Science & Machine Learning with Python","DS-201","priya.verma@outlook.com","426915729103","verified","+91 98234 56789"
"Amit Kumar Patel","SKS-2024-91825","8390217169-1@nyes","4999","26 Sep 2024, 03:15 PM","Advance Tally Prime with GST & TDS","ACC-301","amit.patel.pune@gmail.com","426922849102","verification_pending","+91 97123 45678"
"Sneha Kulkarni","SKS-2024-91826","8390217169-1@nyes","1999","26 Sep 2024, 11:20 AM","Computer Fundamentals & Windows OS","COMP-101","sneha.kulkarni@yahoo.com","426930194827","verified","+91 96543 21098"`;

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="sikshasetu-orders-sample-template.csv"');
  res.send('\uFEFF' + sampleCSV);
});

// Download all orders as CSV endpoint
app.get(['/api/orders/export-csv', '/api/export-csv'], (req, res) => {
  const orders = readOrdersFromFile();
  const headers = ['Name', 'Order id', 'Upi id', 'Amount', 'Date and Time', 'Course name', 'Course ID', 'Email address', 'transaction id of upi', 'Payment Status', 'Mobile'];
  const rows = [headers];

  orders.forEach(o => {
    const p = o.payment || {};
    rows.push([
      o.fullName || '',
      o.enrollmentId || '',
      o.upiId || '8390217169-1@nyes',
      o.coursePrice || '',
      o.createdAt ? new Date(o.createdAt).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) : '',
      o.courseName || '',
      o.courseId || '',
      o.email || '',
      p.utr || '',
      o.paymentStatus || 'verification_pending',
      o.mobile || ''
    ]);
  });

  const csv = rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const dateStr = new Date().toISOString().slice(0, 10);
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="sikshasetu-orders-${dateStr}.csv"`);
  res.send('\uFEFF' + csv);
});

// Get all orders
app.get('/api/orders', (req, res) => {
  const orders = readOrdersFromFile();
  res.json({ success: true, orders });
});

// Save or update an order
app.post('/api/orders', (req, res) => {
  const incoming = req.body;
  if (!incoming || !incoming.enrollmentId) {
    return res.status(400).json({ success: false, message: 'Order ID is required' });
  }

  const orders = readOrdersFromFile();
  const existingIdx = orders.findIndex(o => o.enrollmentId === incoming.enrollmentId);

  if (existingIdx >= 0) {
    orders[existingIdx] = {
      ...orders[existingIdx],
      ...incoming,
      updatedAt: new Date().toISOString()
    };
  } else {
    orders.unshift({
      ...incoming,
      createdAt: incoming.createdAt || new Date().toISOString()
    });
  }

  writeOrdersToFile(orders);
  res.json({ success: true, order: incoming });
});

// Bulk update / import orders from CSV data
app.post('/api/orders/bulk', (req, res) => {
  const { orders: incomingOrders, mode } = req.body;
  if (!Array.isArray(incomingOrders)) {
    return res.status(400).json({ success: false, message: 'Invalid orders array' });
  }

  let currentOrders = readOrdersFromFile();
  let updatedCount = 0;
  let addedCount = 0;

  if (mode === 'replace') {
    currentOrders = incomingOrders;
    addedCount = incomingOrders.length;
  } else {
    // Update existing matched by enrollmentId (Order ID) or add new
    const map = new Map();
    currentOrders.forEach(o => map.set(o.enrollmentId, o));

    incomingOrders.forEach(item => {
      const id = item.enrollmentId || item['Order id'] || item.orderId;
      if (!id) return;
      if (map.has(id)) {
        map.set(id, { ...map.get(id), ...item, updatedAt: new Date().toISOString() });
        updatedCount++;
      } else {
        map.set(id, { ...item, createdAt: item.createdAt || new Date().toISOString() });
        addedCount++;
      }
    });

    currentOrders = Array.from(map.values());
  }

  writeOrdersToFile(currentOrders);
  res.json({
    success: true,
    total: currentOrders.length,
    updatedCount,
    addedCount,
    orders: currentOrders
  });
});

// Delete an order
app.delete('/api/orders/:id', (req, res) => {
  const id = req.params.id;
  let orders = readOrdersFromFile();
  const initialLength = orders.length;
  orders = orders.filter(o => o.enrollmentId !== id);

  if (orders.length !== initialLength) {
    writeOrdersToFile(orders);
    res.json({ success: true, message: 'Order deleted successfully' });
  } else {
    res.status(404).json({ success: false, message: 'Order not found' });
  }
});

// Root path fallback
app.get(['/', '/index.html', '/sikshasetu', '/sikshasetu/index.html'], (req, res) => {
  serveHtml(res, 'index.html');
});

// Unknown route fallback
app.use((req, res) => {
  if (req.accepts('html')) {
    serveHtml(res, 'index.html');
  } else {
    res.status(404).json({ success: false, message: `Route not found: ${req.url}` });
  }
});

// Initialize orders file if not present
readOrdersFromFile();

// Only listen if not invoked as a serverless function (Vercel/AWS)
if (!process.env.VERCEL && !process.env.AWS_LAMBDA_FUNCTION_NAME) {
  app.listen(PORT, HOST, () => {
    console.log(`SikshaSetu server running on http://${HOST}:${PORT}`);
    console.log(`Admin panel available at http://${HOST}:${PORT}/admin`);
  });
}

export default app;
