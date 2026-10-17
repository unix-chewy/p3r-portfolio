/* =====================================================================
   MODEL — the data and state of the app. Never touches the DOM.
   Edit your content here: featured projects, skills, image overrides.
   ===================================================================== */

const Model = {

  githubUser: "unix-chewy",

  // Where the contact form delivers (via formsubmit.co relay)
  contactEmail: "sunga.joneyy@gmail.com",

  // App state (read/written by the Controller, displayed by the View)
  state: {
    screen: "home",        // which screen is showing
    menuIndex: 0,          // selected item on the home menu
    reposLoaded: false,
    skillsBuilt: false,
  },

  // ---- Featured projects (hand-written, shown above the GitHub feed) ----
  featured: [
    {
      title: "Palai",
      tag: "ML App", color: "#3dc8ff", live: true,
      url: "https://github.com/unix-chewy/segformer-rtdetr-aicv24/tree/main/src/modules/backbones/rvt/resnet", cta: "View on GitHub →",
      img: "assets/projects/cv.jpg",
      desc: " A Web-Based Rice Disease Detection and Field-Scale Disease Pressure Estimation System Using SegFormer and Spatial Interpolation ",
    },
    {
      title: "Coffee Taste Predictor",
      tag: "ML", color: "#0064e6", live: true,
      url: "https://github.com/unix-chewy/coffee_taste_predictor.git", cta: "View on GitHub →",
      img: "assets/projects/steam.png",
      desc: "Specialty coffee classification model with 77% accuracy predicting taste profile from sensor data.",
    },
    {
      title: "SonataPy",
      tag: "ML App", color: "#f1e05a", live: true,
      url: "https://github.com/KyleNGT/SonataPy-Real-time-AI-Music-Generator.git", cta: "View on GitHub →",
      img: "assets/projects/downloadguard.png",
      desc: "AI music generator UI using Google's Lyria API with interactive canvas controls.",
    },
  ],

  // Repos already shown in "featured" get hidden from the GitHub feed
  featuredRepoNames: [
    "SegFormer-B1 Leaf Isolation Model",
    "Coffee Taste Predictor",
    "SonataPy",
  ],

  // Shown if the GitHub API can't be reached
  fallbackRepos: [
    {
      name: "segformer-rtdetr-aicv24", language: "Python", stargazers_count: 0,
      html_url: "https://github.com/unix-chewy/segformer-rtdetr-aicv24",
      description: "Rice disease diagnosis using deep learning with ResNet backbone, achieving 97.05% mIoU for leaf segmentation.",
    },
    {
      name: "coffee-taste-predictor", language: "Python", stargazers_count: 0,
      html_url: "https://github.com/unix-chewy/coffee-taste-predictor",
      description: "Coffee quality classifier using scikit-learn with 77% accuracy on sensor data.",
    },
    {
      name: "SonataPy", language: "JavaScript", stargazers_count: 0,
      html_url: "https://github.com/unix-chewy/SonataPy.git",
      description: "Frontend UI for AI music generation with Lyria model integration.",
    },
  ],

  // Optional thumbnail overrides: repo name → image path.
  // Anything not listed is looked up at assets/projects/<RepoName>.png
  projectImages: {
    // "DownloadGuard": "assets/projects/downloadguard.png",
  },

  langColors: {
    JavaScript: "#5c5af1", TypeScript: "#3178c6", Python: "#3572A5",
    PHP: "#4F5D95", CSS: "#663399", HTML: "#e34c26",
    "Jupyter Notebook": "#DA5B0B", MATLAB: "#e16737", Java: "#b07219", C: "#555", "C++": "#f34b7d",
  },

  // ---- Skills screen ----
  skills: [
    { group: "Web Dev", items: [
      ["HTML5", 90], ["CSS3", 85], ["JavaScript (ES6+)", 90],
      ["TypeScript", 75], ["React.js", 65], ["Git & GitHub", 90],
    ]},
    { group: "Data Science · ML", items: [
      ["Python", 88], ["Pandas", 82], ["NumPy", 78],
      ["Scikit-learn", 85], ["Matplotlib", 75], ["Seaborn", 70],
    ]},
    { group: "Development Tools", items: [
      ["VS Code", 90], ["Bash · Linux", 76],
      ["Terminal", 90], ["Jupyter Notebook", 85],
    ]},
    { group: "Spoken Languages", items: [
      ["English (Filipino)", 100], ["Japanese", 25],
    ]},
  ],

  // ---- Data fetching ----
  async fetchRepos() {
    const skip = new Set(this.featuredRepoNames);
    try {
      const res = await fetch(
        `https://api.github.com/users/${this.githubUser}/repos?per_page=100&sort=updated`
      );
      if (!res.ok) throw new Error(res.status);
      const repos = (await res.json()).filter(r => !r.fork && !skip.has(r.name));
      return { repos, live: true };
    } catch {
      return { repos: this.fallbackRepos.filter(r => !skip.has(r.name)), live: false };
    }
  },
};