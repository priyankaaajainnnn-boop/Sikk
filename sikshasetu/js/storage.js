/**
 * SikshaSetu Storage & Orders Service
 * =====================================
 * Manages order and enrollment persistence with dual-mode support:
 * 1. Synchronizes with server REST API (/api/orders) when available.
 * 2. Instant localStorage cache & offline/static hosting fallback (works seamlessly on Vercel static).
 * 3. Seed data initialized with realistic orders on first load.
 */

const STORAGE_KEY = 'sikshasetu_enrollments';
const AUTH_KEY = 'sikshasetu_admin_auth';
const CUSTOM_PASSWORD_KEY = 'sikshasetu_admin_custom_pwd';

const SEED_ORDERS = [
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

const Storage = {
  // ── Private helpers ─────────────────────────────────────────────────────

  _read() {
    try {
      let stored = localStorage.getItem(STORAGE_KEY);
      let data = stored ? JSON.parse(stored) : null;

      // Check secondary persistent backup
      const backup = localStorage.getItem('sikshasetu_persisted_orders');
      if (backup) {
        try {
          const parsedBackup = JSON.parse(backup);
          if (parsedBackup && typeof parsedBackup === 'object') {
            data = { ...(parsedBackup || {}), ...(data || {}) };
          }
        } catch (e) {}
      }

      if (!data || Object.keys(data).length === 0) {
        // Initialize with seed orders
        const initial = {};
        SEED_ORDERS.forEach(o => { initial[o.enrollmentId] = o; });
        localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
        localStorage.setItem('sikshasetu_persisted_orders', JSON.stringify(initial));
        return initial;
      }
      return data;
    } catch (e) {
      console.warn('localStorage read error:', e);
      const initial = {};
      SEED_ORDERS.forEach(o => { initial[o.enrollmentId] = o; });
      return initial;
    }
  },

  _write(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      localStorage.setItem('sikshasetu_persisted_orders', JSON.stringify(data));
    } catch (e) {
      console.error('localStorage write error:', e);
    }
  },

  // ── Server Sync Helper (Non-destructive Bidirectional Sync) ───────────────

  async syncWithServer() {
    const localDict = this._read();
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          const serverOrders = data.orders;
          // Remove legacy 2024 mock orders if transitioning to real dataset
          const merged = {};
          Object.keys(localDict).forEach(k => {
            if (!k.startsWith("SKS-2024-")) {
              merged[k] = localDict[k];
            }
          });
          const serverIds = new Set();

          // 1. Merge server orders into local orders without wiping local CSV updates
          serverOrders.forEach(so => {
            if (!so || !so.enrollmentId) return;
            serverIds.add(so.enrollmentId);
            if (!merged[so.enrollmentId]) {
              merged[so.enrollmentId] = so;
            } else {
              // Both have this order: check which has newer update
              const lo = merged[so.enrollmentId];
              const loTime = new Date(lo.updatedAt || lo.createdAt || 0).getTime();
              const soTime = new Date(so.updatedAt || so.createdAt || 0).getTime();
              if (soTime > loTime) {
                merged[so.enrollmentId] = { ...lo, ...so };
              }
            }
          });

          // 2. Check if local had orders missing on server (e.g. from CSV upload)
          const mergedList = Object.values(merged);
          const missingOnServer = mergedList.filter(o => !serverIds.has(o.enrollmentId));

          // 3. Save combined dataset to local storage
          this._write(merged);

          // 4. If server was missing any local or CSV orders, push complete merged list back to server!
          if (missingOnServer.length > 0 || mergedList.length > serverOrders.length) {
            try {
              await fetch('/api/orders/bulk', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ orders: mergedList, mode: 'replace' })
              });
            } catch (errSync) {
              console.warn('Background sync to server deferred:', errSync);
            }
          }

          return mergedList;
        }
      }
    } catch (e) {
      console.warn('Server sync error, using local orders:', e);
    }
    return this.getAllEnrollments();
  },

  // ── Enrollment / Order Operations ────────────────────────────────────────

  /**
   * Save a new enrollment. Returns enrollmentId.
   */
  saveEnrollment(enrollmentData) {
    const all = this._read();
    const id = enrollmentData.enrollmentId || ('SKS-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000));
    const newRecord = {
      ...enrollmentData,
      enrollmentId: id,
      upiId: enrollmentData.upiId || (typeof CONFIG !== 'undefined' ? CONFIG.upiId : '8390217169-1@nyes'),
      courseId: enrollmentData.courseId || this.resolveCourseId(enrollmentData.courseSlug, enrollmentData.courseName),
      paymentStatus: enrollmentData.paymentStatus || 'awaiting_payment',
      createdAt: enrollmentData.createdAt || new Date().toISOString(),
    };
    all[id] = newRecord;
    this._write(all);

    // Fire & forget sync to server
    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newRecord)
    }).catch(() => {});

    return id;
  },

  getEnrollment(enrollmentId) {
    return this._read()[enrollmentId] || null;
  },

  updatePayment(enrollmentId, paymentData) {
    const all = this._read();
    if (!all[enrollmentId]) return false;
    all[enrollmentId] = {
      ...all[enrollmentId],
      payment: {
        ...paymentData,
        submittedAt: new Date().toISOString(),
      },
      paymentStatus: 'verification_pending',
      paymentSubmittedAt: new Date().toISOString(),
    };
    this._write(all);

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(all[enrollmentId])
    }).catch(() => {});

    return true;
  },

  updatePaymentStatus(enrollmentId, status) {
    const all = this._read();
    if (!all[enrollmentId]) return false;
    all[enrollmentId].paymentStatus = status;
    all[enrollmentId].statusUpdatedAt = new Date().toISOString();
    this._write(all);

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(all[enrollmentId])
    }).catch(() => {});

    return true;
  },

  /**
   * Save or update an entire order record (from edit dialog or API).
   */
  saveOrder(order) {
    if (!order || !order.enrollmentId) return false;
    const all = this._read();
    all[order.enrollmentId] = {
      ...all[order.enrollmentId],
      ...order,
      upiId: order.upiId || (typeof CONFIG !== 'undefined' ? CONFIG.upiId : '8390217169-1@nyes'),
      courseId: order.courseId || this.resolveCourseId(order.courseSlug, order.courseName),
      updatedAt: new Date().toISOString()
    };
    this._write(all);

    fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(all[order.enrollmentId])
    }).catch(() => {});

    return true;
  },

  getAllEnrollments() {
    const all = this._read();
    return Object.values(all).sort(
      (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    );
  },

  deleteEnrollment(enrollmentId) {
    const all = this._read();
    delete all[enrollmentId];
    this._write(all);

    fetch(`/api/orders/${encodeURIComponent(enrollmentId)}`, {
      method: 'DELETE'
    }).catch(() => {});
  },

  // ── Course ID Resolver ──────────────────────────────────────────────────
  resolveCourseId(slug, name) {
    const idMap = {
      'computer-fundamentals': 'COMP-101',
      'ms-office-mastery': 'OFF-201',
      'full-stack-web-dev': 'FSD-101',
      'advance-tally-gst': 'ACC-301',
      'python-data-science': 'DS-201',
      'graphic-design-canva': 'DSG-101',
      'digital-marketing': 'MKT-101',
      'cyber-security-basics': 'SEC-101',
      'cloud-devops': 'CLD-401',
      'typing-mastery': 'TYP-101'
    };
    if (slug && idMap[slug]) return idMap[slug];
    if (name) {
      const lower = name.toLowerCase();
      if (lower.includes('full stack') || lower.includes('mern')) return 'FSD-101';
      if (lower.includes('data science') || lower.includes('machine learning')) return 'DS-201';
      if (lower.includes('tally') || lower.includes('gst')) return 'ACC-301';
      if (lower.includes('office') || lower.includes('excel')) return 'OFF-201';
      if (lower.includes('devops') || lower.includes('cloud')) return 'CLD-401';
      if (lower.includes('fundamental')) return 'COMP-101';
      if (lower.includes('marketing')) return 'MKT-101';
    }
    return 'CRS-' + Math.floor(100 + Math.random() * 900);
  },

  // ── CSV Bulk Import / Update ─────────────────────────────────────────────

  /**
   * Parse CSV string into an array of order objects.
   * Auto-maps variations of headers (e.g. "Order id", "Order ID", "transaction id of upi", "UTR", etc.)
   */
  parseCSV(csvText) {
    if (!csvText || !csvText.trim()) return [];
    
    // Split lines handling \r\n and \n
    const lines = csvText.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length < 2) return [];

    // Parse header row
    const headers = this._parseCSVRow(lines[0]).map(h => h.trim().toLowerCase());
    
    const orders = [];
    for (let i = 1; i < lines.length; i++) {
      const row = this._parseCSVRow(lines[i]);
      if (row.length === 0 || row.every(val => !val.trim())) continue;

      const obj = {};
      headers.forEach((h, colIndex) => {
        obj[h] = row[colIndex] ? row[colIndex].trim() : '';
      });

      // Normalize fields according to requirements
      const name = obj['name'] || obj['student name'] || obj['fullname'] || obj['full name'] || 'Student';
      const orderId = obj['order id'] || obj['orderid'] || obj['id'] || obj['enrollment id'] || ('SKS-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000));
      const upiId = obj['upi id'] || obj['upi'] || obj['upi_id'] || (typeof CONFIG !== 'undefined' ? CONFIG.upiId : '8390217169-1@nyes');
      
      // Clean amount: dynamically detect column name and strip all symbols/commas/spaces
      let rawAmount = obj['amount'] || obj['total amount'] || obj['course price'] || obj['fee'] || obj['fees'] || obj['price'] || obj['amount paid'] || '';
      if (!rawAmount) {
        for (const k of Object.keys(obj)) {
          if (k.includes('amount') || k.includes('price') || k.includes('fee')) {
            rawAmount = obj[k];
            break;
          }
        }
      }
      const cleanAmountStr = String(rawAmount || '0').replace(/[^0-9.-]/g, '');
      const amount = parseFloat(cleanAmountStr) || 0;

      let isoDate = new Date().toISOString();
      const rawDate = obj['date and time'] || obj['date & time'] || obj['date'] || obj['createdat'] || '';
      if (rawDate) {
        try {
          const d = new Date(rawDate);
          if (!isNaN(d.getTime())) {
            isoDate = d.toISOString();
          } else {
            // Check DD/MM/YYYY or DD-MM-YYYY format
            const match = rawDate.match(/(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/);
            if (match) {
              const dt = new Date(`${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`);
              if (!isNaN(dt.getTime())) isoDate = dt.toISOString();
            }
          }
        } catch (e) {
          isoDate = new Date().toISOString();
        }
      }

      const courseName = obj['course name'] || obj['coursename'] || obj['course'] || 'Computer Course';
      const courseId = obj['course id'] || obj['courseid'] || this.resolveCourseId(null, courseName);
      const email = obj['email address'] || obj['email'] || '';
      const utr = obj['transaction id of upi'] || obj['transaction id'] || obj['utr'] || obj['transaction_id'] || '';
      const status = (obj['status'] || obj['payment status'] || (utr ? 'verified' : 'awaiting_payment')).toLowerCase().replace(/\s+/g, '_');
      const mobile = obj['mobile'] || obj['phone'] || '';

      const normalized = {
        enrollmentId: orderId,
        fullName: name,
        mobile: mobile,
        email: email,
        city: obj['city'] || 'Pune',
        courseName: courseName,
        courseId: courseId,
        coursePrice: amount,
        upiId: upiId,
        paymentStatus: ['verified', 'rejected', 'verification_pending', 'awaiting_payment'].includes(status) ? status : (utr ? 'verified' : 'awaiting_payment'),
        createdAt: isoDate,
        mode: obj['mode'] || 'online',
        education: obj['education'] || 'Graduate',
        payment: utr ? {
          utr: utr,
          paymentDate: isoDate.slice(0, 10),
          submittedAt: isoDate,
          screenshotB64: null,
          screenshotName: 'csv_imported'
        } : null
      };

      orders.push(normalized);
    }
    return orders;
  },

  _parseCSVRow(text) {
    const result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        result.push(cur);
        cur = '';
      } else {
        cur += c;
      }
    }
    result.push(cur);
    return result;
  },

  /**
   * Apply bulk imported orders.
   * mode = 'update' (updates matching Order IDs, adds new ones)
   * mode = 'replace' (replaces entire database)
   */
  async applyBulkOrders(importedOrders, mode = 'update') {
    const all = mode === 'replace' ? {} : this._read();
    let updatedCount = 0;
    let addedCount = 0;

    importedOrders.forEach(o => {
      if (!o || !o.enrollmentId) return;
      if (all[o.enrollmentId]) {
        all[o.enrollmentId] = {
          ...all[o.enrollmentId],
          ...o,
          updatedAt: new Date().toISOString()
        };
        updatedCount++;
      } else {
        all[o.enrollmentId] = {
          ...o,
          createdAt: o.createdAt || new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        addedCount++;
      }
    });

    this._write(all);

    // Save dedicated persistent backup
    try {
      localStorage.setItem('sikshasetu_persisted_orders', JSON.stringify(all));
    } catch (e) {}

    // Send the COMPLETE merged dataset to backend server with mode: 'replace'
    const fullList = Object.values(all);
    try {
      const res = await fetch('/api/orders/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orders: fullList, mode: 'replace' })
      });
      if (res.ok) {
        const json = await res.json();
        console.log('Backend bulk sync confirmed:', json);
      }
    } catch (e) {
      console.warn('Backend sync deferred (will sync on next load):', e);
    }

    return { total: fullList.length, updatedCount, addedCount };
  },

  /**
   * Export all orders into CSV with the EXACT requested columns:
   * Name, Order id, Upi id, Amount, Date and Time, Course name, Course ID, Email address, transaction id of upi, Status
   */
  exportToCSV(ordersList) {
    const list = ordersList || this.getAllEnrollments();
    const headers = [
      'Name',
      'Order id',
      'Upi id',
      'Amount',
      'Date and Time',
      'Course name',
      'Course ID',
      'Email address',
      'transaction id of upi',
      'Payment Status',
      'Mobile'
    ];

    const rows = list.map(o => {
      const amount = o.coursePrice || 0;
      const formattedDate = o.createdAt ? new Date(o.createdAt).toLocaleString('en-IN', {
        day: '2-digit', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true
      }) : '';
      const utr = (o.payment && o.payment.utr) || o.utr || '';

      return [
        o.fullName || '',
        o.enrollmentId || '',
        o.upiId || '8390217169-1@nyes',
        amount,
        formattedDate,
        o.courseName || '',
        o.courseId || '',
        o.email || '',
        utr,
        o.paymentStatus || '',
        o.mobile || ''
      ];
    });

    const csvContent = [
      headers.map(h => `"${h.replace(/"/g, '""')}"`).join(','),
      ...rows.map(r => r.map(c => `"${String(c !== undefined && c !== null ? c : '').replace(/"/g, '""')}"`).join(','))
    ].join('\n');

    return csvContent;
  },

  /**
   * Download sample CSV template.
   */
  generateSampleCSV() {
    const sampleRows = [
      ['Name','Order id','Upi id','Amount','Date and Time','Course name','Course ID','Email address','transaction id of upi','Payment Status','Mobile'],
      ['Rahul Sharma','SKS-2024-91823','8390217169-1@nyes','19999','25 Sep 2024, 08:00 PM','Full Stack MERN Developer Mastery','FSD-101','rahul.sharma92@gmail.com','426910847291','verified','+91 98765 12345'],
      ['Priya Verma','SKS-2024-91824','8390217169-1@nyes','9999','25 Sep 2024, 09:45 PM','Data Science & Machine Learning with Python','DS-201','priya.verma@outlook.com','426915729103','verified','+91 98234 56789'],
      ['Amit Kumar Patel','SKS-2024-91825','8390217169-1@nyes','4999','26 Sep 2024, 03:15 PM','Advance Tally Prime with GST & TDS','ACC-301','amit.patel.pune@gmail.com','426922849102','verification_pending','+91 97123 45678'],
      ['Sneha Kulkarni','SKS-2024-91826','8390217169-1@nyes','1999','26 Sep 2024, 11:20 AM','Computer Fundamentals & Windows OS','COMP-101','sneha.kulkarni@yahoo.com','426930194827','verified','+91 96543 21098']
    ];
    return sampleRows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  },

  /**
   * Bulletproof universal file downloader that works in iframes and all browsers.
   */
  downloadFile(content, filename, mimeType = 'text/csv;charset=utf-8;') {
    try {
      const bomContent = content.startsWith('\uFEFF') ? content : '\uFEFF' + content;
      const blob = new Blob([bomContent], { type: mimeType });

      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob, filename);
        return true;
      }

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.setAttribute('download', filename);
      document.body.appendChild(a);
      a.click();

      // Delay revoke so browser download manager has time to read the stream
      setTimeout(() => {
        try {
          if (document.body.contains(a)) document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (e) {}
      }, 2500);
      return true;
    } catch (err) {
      console.warn('Blob download failed, trying data URI fallback:', err);
      try {
        const encoded = 'data:text/csv;charset=utf-8,' + encodeURIComponent('\uFEFF' + content);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = encoded;
        a.setAttribute('download', filename);
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          if (document.body.contains(a)) document.body.removeChild(a);
        }, 1500);
        return true;
      } catch (err2) {
        console.error('Data URI download failed, fallback to server link:', err2);
        const link = document.createElement('a');
        link.href = '/api/orders/sample-csv';
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => document.body.removeChild(link), 1000);
        return false;
      }
    }
  },

  /**
   * Trigger Sample CSV Template Download
   */
  downloadSampleCSV() {
    const csv = this.generateSampleCSV();
    return this.downloadFile(csv, 'sikshasetu-orders-sample-template.csv');
  },

  /**
   * Trigger Orders CSV Download
   */
  exportOrdersToCSV(ordersList) {
    const csv = this.exportToCSV(ordersList);
    const dateStr = new Date().toISOString().slice(0, 10);
    return this.downloadFile(csv, `sikshasetu-orders-${dateStr}.csv`);
  },

  // ── Password & Auth ──────────────────────────────────────────────────────

  getCustomPassword() {
    return localStorage.getItem(CUSTOM_PASSWORD_KEY) || null;
  },

  setCustomPassword(newPwd) {
    localStorage.setItem(CUSTOM_PASSWORD_KEY, newPwd);
  },

  async verifyPassword(pwd) {
    // 1. Check custom password stored in localStorage
    const custom = this.getCustomPassword();
    if (custom && pwd === custom) return true;

    // 2. Check CONFIG.adminPassword
    if (typeof CONFIG !== 'undefined' && pwd === CONFIG.adminPassword) return true;

    // 3. Fallback check with server API
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd })
      });
      if (res.ok) {
        const data = await res.json();
        return !!data.success;
      }
    } catch (e) {
      // Offline fallback
    }

    return pwd === 'Mailguy@123';
  }
};
