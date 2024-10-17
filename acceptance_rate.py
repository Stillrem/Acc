# acceptance_rate.py

def calculate_acceptance_rate(offers):
    accepted_offers = sum(offers)
    total_offers = len(offers)
    return (accepted_offers / total_offers) * 100 if total_offers else 0

# Example usage
if __name__ == "__main__":
    # 1 - accepted, 0 - declined
    last_100_offers = [1, 0, 1, 1, 0] * 20  # Example data
    acceptance_rate = calculate_acceptance_rate(last_100_offers)
    print(f"Acceptance Rate: {acceptance_rate}%")
