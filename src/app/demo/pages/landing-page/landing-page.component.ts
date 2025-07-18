import { Component } from '@angular/core';


interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  category: string;
}

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  avatar: string;
}

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  featuredBooks: Book[] = [
    {
      id: 1,
      title: "The Midnight Library",
      author: "Matt Haig",
      price: 16.99,
      originalPrice: 24.99,
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      category: "Fiction"
    },
    {
      id: 2,
      title: "Educated",
      author: "Tara Westover",
      price: 18.99,
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.8,
      category: "Memoir"
    },
    {
      id: 3,
      title: "The Seven Husbands of Evelyn Hugo",
      author: "Taylor Jenkins Reid",
      price: 15.99,
      originalPrice: 22.99,
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.6,
      category: "Romance"
    },
    {
      id: 4,
      title: "Atomic Habits",
      author: "James Clear",
      price: 19.99,
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.7,
      category: "Self-Help"
    },
    {
      id: 5,
      title: "The Silent Patient",
      author: "Alex Michaelides",
      price: 17.99,
      originalPrice: 25.99,
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.4,
      category: "Thriller"
    },
    {
      id: 6,
      title: "Where the Crawdads Sing",
      author: "Delia Owens",
      price: 16.99,
      image: "https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 4.5,
      category: "Fiction"
    }
  ];

  testimonials: Testimonial[] = [
    {
      name: "Sarah Johnson",
      rating: 5,
      text: "BookNook has completely transformed my reading experience. The book recommendations are spot-on, and the fast delivery means I never have to wait long for my next great read!",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Mike Chen",
      rating: 5,
      text: "I love the curated selection and the personalized recommendations. The customer service is exceptional, and I've discovered so many amazing authors through this platform.",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
    },
    {
      name: "Emily Rodriguez",
      rating: 4,
      text: "The quality of books and packaging is outstanding. Plus, the community aspect makes reading feel more social and engaging. Highly recommend to any book lover!",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100"
    }
  ];

  getStarArray(rating: number): number[] {
    const stars = Math.floor(rating);
    return Array(stars).fill(0);
  }

}
