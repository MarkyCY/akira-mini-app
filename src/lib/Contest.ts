interface Contest {
  id: string;
  type: string;
  amount_photo?: number;
  amount_video?: number;
  amount_text?: number;
  title: string;
  description: string;
  img: string;
  status: string;
  start_date?: number;
  end_date: number;
  subscription: [
    {
      user: Number,
    },
  ],
  created_by: number;
}
