import { useEffect, useState } from "react";
import { Minus, Plus, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookContent } from "./page-content";

const steps = ["Date", "Time", "Guests", "Details", "Notes"];
export function BookingPage() {
  const [step, setStep] = useState(0);
  const [dates, setDates] = useState<Date[]>([]);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [review, setReview] = useState(false);
  useEffect(() => {
    const today = new Date();
    setDates(Array.from({ length: 14 }, (_, i) => { const day = new Date(today); day.setDate(today.getDate() + i); return day; }));
  }, []);
  return <><BookContent /><section className="section container book-wrap">
    <div className="flip-face front">
      <ol className="stepper">{steps.map((title, i) => <li key={title} className={i === step ? "active" : ""}><span>{i + 1}</span>{title}</li>)}</ol>
      {review ? <div className="slip">
        <h2>Reservation details</h2><p className="eyebrow">Café & Bakehaus · Booking slip</p>
        <p>{name} · {guests} guests</p><p>{date} · {time}</p><p>{email} · {phone}</p>{notes && <p>{notes}</p>}
        <p className="reference-notice">Online reservations are not connected yet. Send your request to SEVN to confirm availability.</p>
        <Button asChild variant="reference" className="btn btn-dark"><a href={`mailto:hello@sevn.cafe?subject=${encodeURIComponent("Table reservation request")}&body=${encodeURIComponent(`Name: ${name}\nDate: ${date}\nTime: ${time}\nGuests: ${guests}\nEmail: ${email}\nPhone: ${phone}\nNotes: ${notes}`)}`}>Email reservation request</a></Button>
        <div className="step-actions"><Button variant="reference" className="btn btn-line" onClick={() => { setReview(false); setStep(0); }}>New booking</Button></div>
      </div> : <form onSubmit={e => { e.preventDefault(); if (step === 4) setReview(true); else setStep(step + 1); }}>
        {step === 0 && <div className="date-grid">{dates.map(day => {
          const value = day.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
          return <Button key={value} type="button" variant="reference" className={date === value ? "active" : ""} aria-pressed={date === value} onClick={() => setDate(value)}>
            <small>{day.toLocaleDateString("en-GB", { weekday: "short" })}</small><b>{day.getDate()}</b><small>{day.toLocaleDateString("en-GB", { month: "short" })}</small>
          </Button>;
        })}</div>}
        {step === 1 && <div className="slot-grid">{["07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"].map(slot => <Button key={slot} type="button" variant="reference" aria-pressed={time === slot} className={time === slot ? "active" : ""} onClick={() => setTime(slot)}>{slot}</Button>)}</div>}
        {step === 2 && <div className="booking-guests"><Button variant="reference" type="button" size="icon" aria-label="Fewer guests" disabled={guests <= 1} onClick={() => setGuests(guests - 1)}><Minus /></Button><strong aria-live="polite">{guests}</strong><Button variant="reference" type="button" size="icon" aria-label="More guests" disabled={guests >= 12} onClick={() => setGuests(guests + 1)}><Plus /></Button></div>}
        {step === 3 && <div className="form-grid"><label>Full name<input required autoComplete="name" value={name} onChange={e => setName(e.target.value)} /></label><label>Email<input required type="email" autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} /></label><label>Phone<input required type="tel" autoComplete="tel" value={phone} onChange={e => setPhone(e.target.value)} /></label></div>}
        {step === 4 && <div className="form-grid"><label>Notes<textarea placeholder="Any special requests?" value={notes} onChange={e => setNotes(e.target.value)} /></label></div>}
        <div className="step-actions">{step > 0 ? <Button type="button" variant="reference" className="btn btn-line" onClick={() => setStep(step - 1)}><ArrowLeft /> Back</Button> : <span />}
          <Button variant="reference" className="btn btn-dark" type="submit" disabled={step === 0 && !date || step === 1 && !time}>{step === 4 ? "Review request" : "Continue"}</Button>
        </div>
      </form>}
    </div>
  </section></>;
}