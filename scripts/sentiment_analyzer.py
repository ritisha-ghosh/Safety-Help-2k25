import json
import sys

def analyze_sentiment(text: str):
  """
  Simulates sentiment and severity analysis for a given text.
  In a real application, this would involve a machine learning model.
  """
  text_lower = text.lower()
  sentiment = "neutral"
  severity = "low"

  if "emergency" in text_lower or "danger" in text_lower or "attack" in text_lower or "incident" in text_lower or "harassment" in text_lower or "assault" in text_lower or "unsafe" in text_lower or "bad touch" in text_lower:
      sentiment = "negative"
      severity = "high"
  elif "safe" in text_lower or "help" in text_lower or "support" in text_lower or "positive" in text_lower or "consent" in text_lower or "empower" in text_lower or "resource" in text_lower:
      sentiment = "positive"
      severity = "low"
  elif "alert" in text_lower or "warning" in text_lower:
      sentiment = "negative"
      severity = "medium"

  return {"sentiment": sentiment, "severity": severity}

if __name__ == "__main__":
  # Read input from stdin (e.g., when called by a serverless function)
  input_data = sys.stdin.read()
  try:
      data = json.loads(input_data)
      text_to_analyze = data.get("text", "")
      result = analyze_sentiment(text_to_analyze)
      print(json.dumps(result))
  except json.JSONDecodeError:
      print(json.dumps({"error": "Invalid JSON input"}), file=sys.stderr)
  except Exception as e:
      print(json.dumps({"error": str(e)}), file=sys.stderr)
