import { Component } from '@angular/core';


interface MenuItem {
  title: string;
  description: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-front-page',
  standalone: false,
  templateUrl: './front-page.component.html',
  styleUrl: './front-page.component.scss'
})
export class FrontPageComponent {
menuItems: MenuItem[] = [
    {
      title: 'Fiction',
      description: 'Explore captivating stories, novels, and literary fiction from renowned authors',
      icon: '📚',
      route: '/fiction'
    },
    {
      title: 'Non-Fiction',
      description: 'Discover biographies, history, science, and educational books',
      icon: '🔬',
      route: '/non-fiction'
    },
    {
      title: "Children's Books",
      description: 'Delightful stories and educational books for young readers',
      icon: '🧸',
      route: '/children'
    },
    {
      title: 'Mystery & Thriller',
      description: 'Page-turning mysteries, suspense, and thriller novels',
      icon: '🔍',
      route: '/mystery'
    },
    {
      title: 'Romance',
      description: 'Heartwarming love stories and romantic novels',
      icon: '💖',
      route: '/romance'
    },
    {
      title: 'Science Fiction',
      description: 'Futuristic adventures and imaginative sci-fi worlds',
      icon: '🚀',
      route: '/sci-fi'
    },
    {
      title: 'Self-Help',
      description: 'Personal development and motivational books',
      icon: '🌟',
      route: '/self-help'
    },
    {
      title: 'Textbooks',
      description: 'Academic and educational resources for students',
      icon: '🎓',
      route: '/textbooks'
    }
  ];

  navigateToSection(route: string) {
    console.log(`Navigating to: ${route}`);
    // Here you would implement actual routing logic
    alert(`Would navigate to: ${route}`);
  }
}
