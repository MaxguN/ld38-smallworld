// Fill out your copyright notice in the Description page of Project Settings.

#include "SmallRTS.h"
#include "Faction.h"


// Sets default values
AFaction::AFaction()
{
 	// Set this pawn to call Tick() every frame.  You can turn this off to improve performance if you don't need it.
	PrimaryActorTick.bCanEverTick = true;

}

// Called when the game starts or when spawned
void AFaction::BeginPlay()
{
	Super::BeginPlay();
	
}

// Called every frame
void AFaction::Tick(float DeltaTime)
{
	Super::Tick(DeltaTime);

}

// Called to bind functionality to input
void AFaction::SetupPlayerInputComponent(UInputComponent* PlayerInputComponent)
{
	Super::SetupPlayerInputComponent(PlayerInputComponent);

}

