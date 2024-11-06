import { useState } from 'react'
import axios from 'axios'
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Star, Loader2 } from 'lucide-react'

interface Order {
  id: string
  interviewerName: string
  date: string
  status: 'completed' | 'pending' | 'cancelled'
  price: number
}

interface ReviewDialogProps {
  order: Order
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  onReviewSubmitted: () => void
}

export function ReviewDialog({ order, isOpen, onOpenChange, onReviewSubmitted }: ReviewDialogProps) {
  const [reviewText, setReviewText] = useState<string>('')
  const [rating, setRating] = useState<number>(0)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmitReview = async () => {
    if (rating === 0) {
      toast({
        title: "Error",
        description: "Please select a rating before submitting.",
        variant: "destructive",
      })
      return
    }

    setSubmitting(true)
    try {
      await axios.post('/api/submit-review', {
        orderId: order.id,
        rating,
        review: reviewText
      })
      toast({
        title: "Success",
        description: "Your review has been submitted successfully.",
      })
      setReviewText('')
      setRating(0)
      onReviewSubmitted()
      onOpenChange(false)
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      })
      console.error('Error submitting review:', err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Review</DialogTitle>
          <DialogDescription>
            Rate and review your interview session with {order.interviewerName}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="rating" className="text-right">
              Rating
            </Label>
            <div className="flex col-span-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="review" className="text-right">
              Review
            </Label>
            <Textarea
              id="review"
              placeholder="Write your review here..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmitReview} disabled={submitting}>
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Review'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}