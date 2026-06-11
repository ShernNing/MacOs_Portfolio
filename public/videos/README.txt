Drop demo recordings here. Expected filenames:
  chordvault.mp4
  workout-tracker.mp4
  transposeme.mp4
  managerpro.mp4

Keep them short (10-25s), muted-friendly, H.264 MP4, <10 MB each if possible.
Record with QuickTime (File > New Screen Recording), then compress:
  ffmpeg -i in.mov -vcodec libx264 -crf 28 -preset slow -vf "scale=1280:-2" -an out.mp4
